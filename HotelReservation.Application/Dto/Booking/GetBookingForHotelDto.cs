using HotelReservation.Application.Dto.General;

namespace HotelReservation.Application.Dto.Booking
{
    public class GetBookingForHotelDto : DateRangeDto
    {
        public string HotelName { get; set; }
    }
}
