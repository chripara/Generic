using HotelReservation.Application.Dto.General;

namespace HotelReservation.Application.Dto.Hotels
{
    public class BookedDatesDto : DateRangeDto
    {
        public string RoomNumber { get; set; }
    }
}
