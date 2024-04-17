using AutoMapper;
using HotelReservation.AppConstants;
using HotelReservation.Application.Dto.Booking;
using HotelReservation.Application.Dto.Bookings;
using HotelReservation.Application.Dto.General;
using HotelReservation.Domain.Models;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Serilog;

namespace HotelReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public BookingController(
            AppDbContext context,
            UserManager<User> userManager,
            IMapper mapper
            ) 
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context; 
        }

        [HttpGet]
        [Route("GetBooking")]
        [Authorize(Roles = RoleConstants.RoleAdmin + "," + RoleConstants.RoleUser)]
        public async Task<IActionResult> GetBooking([FromQuery] GetBookingDto dto)
        {
            Log.Information("GetBookingDto: {@GetBookingDto}", FilterDto(JObject.FromObject(dto)));

            var booking = await _context.Bookings.Include(i => i.User).FirstOrDefaultAsync(f => f.Id == dto.Id);
            var bookingDto = _mapper.Map<GetBookingsDto>(booking);

            var loggedUser = User.Identity.Name;

            if (booking.User.UserName != loggedUser)
            
            Log.Information("Bookings : {@GetBookingsDto} \n Requested by User: {@Username}", FilterDto(JObject.FromObject(bookingDto)), loggedUser);

            return Ok(bookingDto);
        }

        [HttpDelete]
        [Authorize(Roles = RoleConstants.RoleAdmin + "," + RoleConstants.RoleUser)]
        [Route("DeleteBooking")]
        public async Task<IActionResult> DeleteBooking(DeleteBookingDto dto)
        {
            Log.Information("DeleteBookingDto: {@DeleteBookingDto}", FilterDto(JObject.FromObject(dto)));
            // var username = HttpContext.User.Identity?.Name;
            var booking = await _context.Bookings.Include(i => i.User).FirstOrDefaultAsync(f=> f.Id == dto.Id);
            
            if (booking == null || HttpContext.User.Identity?.Name != booking.User.UserName)
            {
                return NotFound();
            }
            
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            Log.Information("Booking Deleted.");
            return Ok("Booking Deleted.");
        }

        [HttpPost]
        [Authorize(Roles = RoleConstants.RoleAdmin + "," + RoleConstants.RoleUser)]
        [Route("CreateBookings")]
        public async Task<IActionResult> CreateBookings(CreateBookingDto dto)
        {
            Log.Information("CreateBookingDto: {@CreateBookingDto}", FilterDto(JObject.FromObject(dto)));
            var currentUser =
                await _context.Users.FirstOrDefaultAsync(f => f.UserName == HttpContext.User.Identity.Name);
            
            var newBooking = _mapper.Map<Booking>(dto);

            newBooking.UserId = currentUser.Id;
            
            var bookingsForHotelRoom = await _context.HotelRooms.Include(i => i.Bookings)
                .FirstOrDefaultAsync(f => f.Id == dto.HotelRoomId);

            if (IsDatesAvailable(bookingsForHotelRoom.Bookings.ToList(), new DateRangeDto
                {
                    EndDate = dto.EndDate,
                    StartDate = dto.StartDate
                }))
            {
                await _context.Bookings.AddAsync(newBooking);
                await _context.SaveChangesAsync();

                Log.Information("Booking Created.");
                return Ok("Booking Created.");
            }

            return BadRequest();
        }

        [HttpPut]
        [Route("UpdateBooking")]
        [Authorize(Roles = RoleConstants.RoleAdmin + "," + RoleConstants.RoleUser)]
        public async Task<IActionResult> UpdateBooking(UpdateBookingDto dto)
        {
            Log.Information("UpdateBookingDto: {@UpdateBookingDto}", FilterDto(JObject.FromObject(dto)));
            
            var booking = await _context.Bookings.FindAsync(dto.Id);
            
            if (booking == null || HttpContext.User.Identity?.Name != booking.User.UserName)
            {
                return NotFound();
            }
            
            var bookingsForHotelRoom = await _context.HotelRooms.Include(i => i.Bookings)
                .FirstOrDefaultAsync(f => f.Id == booking.HotelRoomId);

            if (IsDatesAvailable(bookingsForHotelRoom.Bookings.ToList(), new DateRangeDto
                {
                    EndDate = dto.EndDate,
                    StartDate = dto.StartDate
                }))
            {
                var updateBooking = _mapper.Map<Booking>(dto);
                _context.Update(updateBooking);
                await _context.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();
        }

        [Route("GetMyBookings")]
        [HttpGet]
        [Authorize(Roles = RoleConstants.RoleAdmin + "," + RoleConstants.RoleUser)]
        public async Task<IActionResult> GetMyBookings()
        {
            var loggedUser = await  _context.Users.Include(i=> i.Bookings)
                .Include(i=>i.Bookings).FirstOrDefaultAsync(f => f.UserName == User.Identity.Name);

            //var bookings = _mapper.Map<List<GetBookingsDto>>(loggedUser.Bookings.ToList());

            var getMyBookings = new List<GetMyBookingsDto>();
            foreach (var booking in loggedUser.Bookings.ToList())
            {
                var bookingsWithHotelAndHotelRooms =
                    await _context.Bookings
                        .Include(i => i.HotelRoom)
                        .Include(i => i.HotelRoom.Hotel)
                        .FirstOrDefaultAsync(f => f.Id == booking.Id);
                
                getMyBookings.Add(
                    new GetMyBookingsDto
                    {
                        Description = booking.Description,
                        Id = booking.Id,
                        EndDate = booking.EndDate,
                        StartDate = booking.StartDate,
                        Hotel = bookingsWithHotelAndHotelRooms.HotelRoom.Hotel.Name,
                        Cost = bookingsWithHotelAndHotelRooms.HotelRoom.Cost.ToString(),
                        HotelAddress = bookingsWithHotelAndHotelRooms.HotelRoom.Hotel.Address,
                        RoomNumber = bookingsWithHotelAndHotelRooms.HotelRoom.RoomNumber
                    }
                );
            }
            
            Log.Information("HotelDto: {@HotelDto}", JArray.FromObject(getMyBookings));
            return Ok(getMyBookings);
        }

        [Route("GetAllBookingsForHotel")]
        [HttpGet]
        [Authorize(Roles = RoleConstants.RoleAdmin)]
        public async Task<IActionResult> GetAllBookingsForHotelInDate([FromQuery] GetBookingForHotelDto dto)
        {
            Log.Information("GetBookingForHotelDto: {@GetBookingForHotelDto}", FilterDto(JObject.FromObject(dto)));
            
            var bookings = _context.Bookings.Include(i => i.HotelRoom)
                .Include(i => i.HotelRoom.Hotel)
                .Where(w => w.HotelRoom.Hotel.Name == dto.HotelName)
                .ToList();
            
            var listOfBookings = _mapper.Map<BookingDto>(bookings);           
            Log.Information("GetBookingForHotelDto: {@GetBookingForHotelDto}", JArray.FromObject(listOfBookings));
            return Ok(listOfBookings);
        }

        [Route("SeedBookings")]
        [HttpPost]
        [Authorize(Roles = RoleConstants.RoleAdmin)]
        public async Task<IActionResult> SeedBookings()
        {
            var hotels = _context.Hotels.Include(i => i.HotelRooms).ToList();

            foreach(var hotel in hotels)
            {
                foreach(var hotelRoom in hotel.HotelRooms.ToList())
                {
                    var counterStart = 0;
                    var counterEnd = 0;
                    var tempCountStart = RandomNumInt();
                    
                    // for(var i=0; i<=3; i++)
                    // {
                        counterStart += 1 * 3 + 1;
                        counterEnd += 1 * 3 + 1 + tempCountStart ;

                        _context.Bookings.Add(new Booking
                        {
                            Description = "asdfasdf",
                            StartDate = DateTime.Now.AddDays(counterStart),
                            EndDate = DateTime.Now.AddDays(counterEnd),
                            FirstName = "asdfasdf",
                            HotelRoomId = hotelRoom.Id,
                            LastName = "asdfasdf",
                            Room = "asdf",
                            UserId = 1 //
                        });

                        await _context.SaveChangesAsync();
                        //tempCountStart = RandomNumInt();
                    //}
                }
            }

            return Ok();
        }
 
        private bool IsDatesAvailable(List<Booking> bookings, DateRangeDto dto)
        {
            var isDatesAvailable = true;
            foreach (var booking in bookings)
            {
                if(booking.StartDate.Date < dto.EndDate.Date && booking.EndDate.Date >= dto.EndDate.Date)
                {
                    isDatesAvailable = false;
                }
                if(booking.StartDate.Date <= dto.StartDate.Date && booking.EndDate.Date > dto.StartDate.Date)
                {
                    isDatesAvailable = false;
                }
                if(booking.StartDate.Date > dto.StartDate.Date && booking.EndDate.Date < dto.EndDate.Date)
                {
                    isDatesAvailable = false;
                }
            }

            return isDatesAvailable;
        }
        
        private int RandomNumInt()
        {
            var randomGenerator = new Random();

            return randomGenerator.Next(1,3);
        }

        private string FilterDto(JObject dto)
        {
            dto.Remove("Password");
            dto.Remove("Token");
            dto.Remove("ConfirmPassword");
            dto.Remove("NewPassword");
            dto.Remove("ConfirmNewPassword");
            
            return dto.ToString();
        }
    }
}
