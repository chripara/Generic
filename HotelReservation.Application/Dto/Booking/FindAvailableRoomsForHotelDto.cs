using HotelReservation.Application.Dto.General;

namespace HotelReservation.Application.Dto.Hotels
{
    public class FindAvailableRoomsForHotelDto : DateRangeDto
    {
        public string HotelName { get; set; }
        public string Capacity { get; set; }
    }
}