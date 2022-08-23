using HotelReservation.Application.Dto.General;

namespace HotelReservation.Application.Dto.Booking
{
    public class FindRoomsForDateDto : DateRangeDto
    {
        public string City { get; set; }
        public string Capacity { get; set; }
        public float MinPricePerDay { get; set; }
        public float MaxPricePerDay { get; set; }
    }
}
