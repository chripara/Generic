using HotelReservation.Application.Dto.Auth;
using HotelReservation.Application.Dto.Hotels;
using HotelReservation.Domain.Models.Auth;

namespace HotelReservation.Application.Dto.Bookings
{
    public class BookingDto
    {        
        public int Id { get; set; }
        public string Room { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public HotelRoomDto HotelRoomDto { get; set; }
        public UserDto? User { get; set; }        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
