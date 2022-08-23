using HotelReservation.Application.Dto.Bookings;

namespace HotelReservation.Application.Dto.Hotels
{
    public class HotelRoomDto
    {   public int Id { get; set; }
        public string RoomNumber { get; set; }
        public string Capacity { get; set; }
        public string Cost { get; set; }
        public string Description { get; set; }
        public HotelDto HotelDto { get; set; }
        public List<BookingDto> Bookings { get; set; } = new List<BookingDto>();
    }
}