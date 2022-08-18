using AutoMapper;
using HotelReservation.Application.Dto.Bookings;
using HotelReservation.Domain.Models;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public BookingController(
            AppDbContext context,
            IMapper mapper
            ) 
        {
            _mapper = mapper;
            _context = context; 
        }

        [HttpGet]
        [Route("GetBooking")]
                public async Task<IActionResult> GetBooking(GetBookingDto dto)
        {
            var booking = await _context.Booking.FindAsync(dto.Id);
            return Ok(booking);
        }

        //[HttpGet]
        //[Route("GetBookings")]
        //public async Task<IActionResult> GetBookings(GetBookingsRequestDateDto dto)
        //{            
        //    var bookings = _context.Booking.Where(p => p.StartDate.Date >= dto.StartDate.Date && p.StartDate.Date <= dto.EndDate.Date).ToList();
        //    return Ok(bookings);
        //}

        [HttpDelete]
        [Route("DeleteBooking")]
        public async Task<IActionResult> DeleteBooking(DeleteBookingDto dto)
        {
            var booking = await _context.Booking.FindAsync(dto.Id);
            _context.Booking.Remove(booking);
            return Ok();
        }

        [HttpPost]
        [Route("CreateBookings")]
        public async Task<IActionResult> CreateBookings(CreateBookingDto dto)
        {
            var var1 = _mapper.Map<Booking>(dto);

            return Ok();
        }

        [HttpPut]
        [Route("UpdateBooking")]
        public async Task<IActionResult> UpdateBooking()
        {
            return Ok();
        }

        //[Route("GetAllBookingsForHotel")]
        //[Route("GetAllBookingsForHotel")]

    }
}
