using AutoMapper;
using HotelReservation.Application.Dto.Booking;
using HotelReservation.Application.Dto.Bookings;
using HotelReservation.Application.Dto.General;
using HotelReservation.Application.Dto.Hotels;
using HotelReservation.Domain.Models;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Domain.Models.Bookings;
using HotelReservation.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var hotels = _context.Hotels.ToList();

            return Ok(hotels);
        }

        [Route("GetHotel")]
        [HttpGet]
        public async Task<IActionResult> GetHotels([FromQuery] int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            return Ok(hotel);
        }

        [Route("UpdateHotel")]
        [HttpPut]
        public async Task<IActionResult> UpdateHotel(HotelDto dto)
        {
            var hotel = await _context.Hotels.FindAsync(dto.Id);

            if (hotel == null)
            {
                return NotFound();
            }

            hotel = _mapper.Map<Hotel>(dto);
            
            _context.Update(hotel);
            await _context.SaveChangesAsync();

            return Ok(hotel);
        }

        [Route("DeleteHotel")]
        [HttpDelete]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound();
            }

            _context.Remove(hotel);
            await _context.SaveChangesAsync();

            return Ok(hotel);
        }

        [Route("FindAvailableRoomsForHotel")]
        [HttpPost]
        public async Task<IActionResult> FindAvailableRoomsForHotel(FindAvailableRoomsForHotelDto dto)
        {
            var hotel = await _context.Hotels.FirstOrDefaultAsync(f => f.Name == dto.HotelName);

            if (hotel == null)
            {
                return NotFound("Hotel not found.");
            }

            var hotelRooms = _context.HotelRooms.Where(w => w.HotelId == hotel.Id);

            var bookings = FindBookingsForRangeDate(dto);
            
            var availability = new AvailabilityInHotel
            {
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                BookedDatesDtos = _mapper.Map<List<Booking>, List<BookedDatesDto>>(bookings),
                HotelName = dto.HotelName,
                HotelRoomDtos = _mapper.Map<List<HotelRoom>, List<HotelRoomDto>>(hotel.HotelRooms.ToList())
            };

            return Ok(availability);
        }

        [Route("FindRoomsForDate")]
        [HttpPost]
        public async Task<IActionResult> FindRoomsForDate(FindRoomsForDateDto dto)
        {
            var bookings = _context.Bookings.Where(p => p.StartDate.Date >= dto.StartDate.Date
                && p.EndDate.Date <= dto.EndDate.Date)
                .Include(i => i.HotelRoom)
                .Include(i => i.HotelRoom.Hotel)                
                .Where(w => w.HotelRoom.Capacity == dto.Capacity)
                .ToList();

            var hotels = _context.Hotels.Include(i=>i.HotelRooms).ToList();

            if (dto.City != null)
            {
                bookings = bookings.Where(w => w.HotelRoom.Hotel.City == dto.City).ToList();
                hotels = hotels.Where(w => w.City == dto.City).ToList();
            }
            
            if (dto.Capacity != null)
            {
                bookings = bookings.Where(w => w.HotelRoom.Capacity == dto.Capacity).ToList();
                hotels = hotels.Where(w => w.HotelRooms.All(a => a.Capacity == dto.Capacity)).ToList();
            }

            if (dto.MinPricePerDay != null)
            {
                bookings = bookings.Where(w => double.Parse(w.HotelRoom.Cost) 
                    >= double.Parse(dto.MinPricePerDay)).ToList();
                hotels = hotels.Where(w => w.HotelRooms.All(w => 
                    double.Parse(w.Cost) >= double.Parse(dto.MinPricePerDay))).ToList();
}

            if (dto.MaxPricePerDay != null)
            {
                bookings = bookings.Where(w => double.Parse(w.HotelRoom.Cost) 
                    <= double.Parse(dto.MaxPricePerDay)).ToList();
                hotels = hotels.Where(w => w.HotelRooms.All(w => 
                    double.Parse(w.Cost) <= double.Parse(dto.MaxPricePerDay))).ToList();
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
                        hotel.HotelRooms.ToList())
                });
            }

            return Ok(availabilityInHotel);
        }

        [Route("SeedHotels")]
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

        [HttpPost]
        [Route("SeedHotelRooms")]
        public async Task<IActionResult> SeedHotelRooms()
        {
            var hotels = _context.Hotels.ToList();

            foreach (var hotel in hotels)
            {
                var hotelRooms = new List<HotelRoom> {
                    new HotelRoom
                    {                        
                        Capacity = "1",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "1",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "1",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "2",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "3",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "3",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    },
                    new HotelRoom
                    {                        
                        Capacity = "4",
                        Description = "Description 1",
                        Cost = "Cost1",
                        RoomNumber = "RoomNumber",
                        HotelId = hotel.Id,
                    }
                };

                await _context.AddRangeAsync(hotelRooms);
                await _context.SaveChangesAsync();
            }

            return Ok("Hotel rooms created.");
        }

        //[Route("GetDetailsForHotel")]
        //[Route("GetHotels")]
        //[Route("GetHotelsWithOffers")]

        // anazitisi me vasi ths imerominies, timh, typo, poli, arithmo atomwn, 
        // anazitisi dwmatiwn sto sigkekrimeno hotel me vasi hmerominies, times, atoma

        private List<Booking> FindBookingsForRangeDate(FindAvailableRoomsForHotelDto dto)
        {
            var bookings = _context.Bookings.Where(p => p.StartDate.Date >= dto.StartDate.Date
                && p.EndDate.Date <= dto.EndDate.Date)
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
    }
}
