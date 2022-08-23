using HotelReservation.Application.Dto.General;
using HotelReservation.Application.Interface;

namespace HotelReservation.Application.Dto.Hotels
{
    public class BookedDatesDto : DateRangeDto
    {
        public string RoomNumber { get; set; }
    }
}
