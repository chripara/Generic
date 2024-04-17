using AutoMapper;
using HotelReservation.AppConstants;
using HotelReservation.Application.Dto.Booking;
using HotelReservation.Application.Dto.Hotels;
using HotelReservation.Domain.Models;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Domain.Models.Bookings;
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
    public class HotelController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public HotelController(AppDbContext context,
            UserManager<User> userManager,
            IMapper mapper)
        {       
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }

        [Route("GetAllHotels")]
        [HttpGet]
        public IActionResult GetAllHotels()
        {
            Log.Information("GetAllHotels");
            var hotels = _mapper.Map<List<HotelDto>>(_context.Hotels.ToList());

            Log.Information("Hotel: {@Hotel}", JArray.FromObject(hotels));
            return Ok(hotels);
        }

        [Route("GetHotel")]
        [HttpGet]
        public async Task<IActionResult> GetHotels([FromQuery] int id)
        {
            Log.Information("GetHotels: {@id}", id);
            var hotel = await _context.Hotels.FindAsync(id);

            Log.Information("Hotel: {@Hotel}", FilterDto(JObject.FromObject(hotel)));
            return Ok(hotel);
        }

        [Route("UpdateHotel")]
        [Authorize(Roles = RoleConstants.RoleAdmin)]
        [HttpPut]
        public async Task<IActionResult> UpdateHotel(HotelDto dto)
        {
            Log.Information("HotelDto: {@HotelDto}", FilterDto(JObject.FromObject(dto)));
            var hotel = await _context.Hotels.FindAsync(dto.Id);

            if (hotel == null)
            {
                Log.Information("NotFound");
                return NotFound();
            }

            hotel = _mapper.Map<Hotel>(dto);
            
            _context.Update(hotel);
            await _context.SaveChangesAsync();

            Log.Information("Hotel: {@Hotel}", FilterDto(JObject.FromObject(hotel)));
            return Ok(hotel);
        }

        [Route("DeleteHotel")]
        [Authorize(Roles = RoleConstants.RoleAdmin)]
        [HttpDelete]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            Log.Information("DeleteHotel: {@id}", id);
            
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                Log.Information("NotFound: {@id}", id);
                return NotFound();
            }

            _context.Remove(hotel);
            await _context.SaveChangesAsync();

            Log.Information("Hotel: {@Hotel}", FilterDto(JObject.FromObject(hotel)));
            return Ok(hotel);
        }

        [Route("FindAvailableRoomsForHotel")]
        [HttpPost]
        public async Task<IActionResult> FindAvailableRoomsForHotel(FindAvailableRoomsForHotelDto dto)
        {
            Log.Information("FindAvailableRoomsForHotelDto: {@FindAvailableRoomsForHotelDto}", FilterDto(JObject.FromObject(dto)));

            var hotel = await _context.Hotels
                .Include(i => i.HotelRooms)
                .FirstOrDefaultAsync(f => f.Name == dto.HotelName); //include HotelRooms

            if (hotel == null)
            {
                Log.Information("Hotel not found.");
                return NotFound("Hotel not found.");
            }

            var bookings = FindBookingsForRangeDate(dto);

            var bookedDatesDtos = _mapper.Map<List<Booking>, List<BookedDatesDto>>(bookings);
            var hotelRoomDtos = _mapper.Map<List<HotelRoom>, List<HotelRoomDto>>(hotel.HotelRooms.ToList());

            var availability = new AvailabilityInHotel
            {
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                BookedDatesDtos = _mapper.Map<List<Booking>, List<BookedDatesDto>>(bookings),
                HotelName = dto.HotelName,
                HotelRoomDtos = _mapper.Map<List<HotelRoom>, List<HotelRoomDto>>(hotel.HotelRooms.ToList())
            };

            Log.Information("AvailabilityInHotel: {@AvailabilityInHotel}", JArray.FromObject(availability));
            return Ok(availability);
        }

        [Route("FindRoomsForDate")]
        [HttpPost]
        public async Task<IActionResult> FindRoomsForDate(FindRoomsForDateDto dto)
        {
            Log.Information("FindRoomsForDateDto: {@FindRoomsForDateDto}", FilterDto(JObject.FromObject(dto)));
            
            var bookings = _context.Bookings.Where(p =>
                (p.EndDate.Date > dto.StartDate.Date && p.EndDate.Date <= dto.EndDate.Date) ||
                (p.StartDate.Date >= dto.StartDate.Date && p.StartDate <= dto.EndDate.Date))
                .Include(i => i.HotelRoom)
                .Include(i => i.HotelRoom.Hotel)                
                .ToList();

            var hotels = _context.Hotels.Include(i=>i.HotelRooms).ToList();
            var hotelRooms = _context.HotelRooms.Include(i=>i.Hotel).ToList();

            if (string.IsNullOrEmpty(dto.City))
            {
                bookings = bookings.Where(w => w.HotelRoom.Hotel.City == dto.City).ToList();
                hotels = hotels.Where(w => w.City == dto.City).ToList();
                hotelRooms = hotelRooms.Where(w => w.Hotel.City == dto.City).ToList();
            }
            
            if (string.IsNullOrEmpty(dto.Capacity))
            {
                bookings = bookings.Where(w => w.HotelRoom.Capacity == dto.Capacity).ToList();
                hotels = hotels.Where(w => w.HotelRooms.Any(a => a.Capacity == dto.Capacity)).ToList();
                hotelRooms = hotelRooms.Where(w => w.Capacity == dto.Capacity).ToList();                
            }

            if (dto.MinPricePerDay.HasValue)
            {
                bookings = bookings.Where(w => w.HotelRoom.Cost
                    >= dto.MinPricePerDay).ToList();
                hotels = hotels.Where(w => w.HotelRooms.Any(w => 
                    w.Cost >= dto.MinPricePerDay)).ToList();
                hotelRooms = hotelRooms.Where(w => w.Cost >= dto.MinPricePerDay).ToList();
            }
            
            if (dto.MaxPricePerDay.HasValue)
            {
                bookings = bookings.Where(w => w.HotelRoom.Cost 
                    <= dto.MaxPricePerDay).ToList();
                hotels = hotels.Where(w => w.HotelRooms.Any(w => 
                    w.Cost <= dto.MaxPricePerDay)).ToList();
                hotelRooms = hotelRooms.Where(w => w.Cost <= dto.MaxPricePerDay).ToList();
            }
            
            var availabilityInHotel = new List<AvailabilityInHotel>();

            foreach(var hotel in hotels)
            {
                availabilityInHotel.Add(new AvailabilityInHotel
                {
                    BookedDatesDtos = _mapper.Map<List<Booking>, List<BookedDatesDto>>(
                        bookings.Where(w=>w.HotelRoom.Hotel.Name == hotel.Name).ToList()),
                    EndDate = dto.EndDate,
                    StartDate = dto.StartDate,
                    HotelName = hotel.Name,
                    HotelRoomDtos = _mapper.Map<List<HotelRoom>, List<HotelRoomDto>>(
                        hotelRooms.Where(w => w.HotelId == hotel.Id).ToList())
                });
            }

            var asdas = JObject.FromObject(availabilityInHotel);
            var av = FilterDto(JObject.FromObject(availabilityInHotel));
            Log.Information("AvailabilityInHotel: {@AvailabilityInHotel}", JArray.FromObject(availabilityInHotel));
            return Ok(availabilityInHotel);
        }

        [Route("SeedHotels")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> SeedHotels()
        {
            var hotels = new List<Hotel>
            {
                new Hotel
                {                    
                    Address = "Address1",
                    City = "City",
                    Description = "Description of Hotel1",
                    Name = "Hotel1",
                    PhoneNumber = "Hotel1 Number",
                    PostCode = "Hotel1 PC",
                    Rate = "4.5",
                    Type = "Hotel"
                },
                new Hotel
                {                    
                    Address = "Address2",
                    City = "City",
                    Description = "Description of Hotel2",
                    Name = "Hotel2",
                    PhoneNumber = "Hotel2 Number",
                    PostCode = "Hotel2 PC",
                    Rate = "4.5",
                    Type = "Hotel"
                },
                new Hotel
                {                    
                    Address = "Address3",
                    City = "City",
                    Description = "Description of Hotel3",
                    Name = "Hotel3",
                    PhoneNumber = "Hotel3 Number",
                    PostCode = "Hotel3 PC",
                    Rate = "4.5",
                    Type = "Hotel"
                },
                new Hotel
                {                    
                    Address = "Address4",
                    City = "City",
                    Description = "Description of Hotel4",
                    Name = "Hote4",
                    PhoneNumber = "Hotel4 Number",
                    PostCode = "Hotel PC",
                    Rate = "4.5",
                    Type = "Hostel"
                },
                new Hotel
                {                    
                    Address = "Address5",
                    City = "City",
                    Description = "Description of Hotel5",
                    Name = "Hotel5",
                    PhoneNumber = "Hotel5 Number",
                    PostCode = "Hotel5 PC",
                    Rate = "4.5",
                    Type = "Hostel"
                },
            };

            await _context.Hotels.AddRangeAsync(hotels);
            await _context.SaveChangesAsync();

            return Ok("Hotel seeded");
        }

        [Route("SeedHotelRooms")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> SeedHotelRooms()
        {
            var hotels = _context.Hotels.ToList();

            var random = new Random();

            foreach (var hotel in hotels)
            {
                var hotelRooms = new List<HotelRoom> {
                    new HotelRoom
                    {                        
                        Capacity = "1",
                        Description = "Description 1",
                        Cost = random.Next(20,40),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "1",
                        Description = "Description 1",
                        Cost = random.Next(20,40),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "1",
                        Description = "Description 1",
                        Cost = random.Next(20,40),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = random.Next(30,60),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = random.Next(30,60),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = random.Next(30,60),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = random.Next(30,60),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "3",
                        Description = "Description 1",
                        Cost = random.Next(50,90),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "3",
                        Description = "Description 1",
                        Cost = random.Next(50,90),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "4",
                        Description = "Description 1",
                        Cost = random.Next(90,110),
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    }
                };

                await _context.AddRangeAsync(hotelRooms);
                await _context.SaveChangesAsync();
            }

            return Ok("Hotel rooms created.");
        }

        [Route("ChangeCost")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> ChangeCost()
        {
            var hotelRooms = await _context.HotelRooms.ToListAsync();

            var random = new Random();
            
            foreach (var hotelRoom in hotelRooms)
            {
                switch (hotelRoom.Capacity)
                {
                    case "1":
                        hotelRoom.Cost = random.Next(20, 40);
                        break;
                    case "2":
                        hotelRoom.Cost = random.Next(30, 60);
                        break;
                    case "3":
                        hotelRoom.Cost = random.Next(50, 90);
                        break;
                    case "4":
                        hotelRoom.Cost = random.Next(90, 110);
                        break;
                }

                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        //TODO: AvailabilityInHotel for Logs 500.
        
        private List<Booking> FindBookingsForRangeDate(FindAvailableRoomsForHotelDto dto)
        {
            var bookings = _context.Bookings.Where(p => 
                    (p.EndDate.Date > dto.StartDate.Date && p.EndDate.Date <= dto.EndDate.Date) ||
                    (p.StartDate.Date >= dto.StartDate.Date && p.StartDate <= dto.EndDate.Date))
                .Include(i => i.HotelRoom)
                .Include(i => i.HotelRoom.Hotel)
                .Where(w => w.HotelRoom.Hotel.Name == dto.HotelName)
                .Where(w => w.HotelRoom.Capacity == dto.Capacity)
                .ToList();

            if (dto.Capacity != null)
            {
                bookings = bookings.Where(p => p.HotelRoom.Capacity == dto.Capacity).ToList();
            }

            return bookings;
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
