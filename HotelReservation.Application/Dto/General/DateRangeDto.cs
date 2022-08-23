using HotelReservation.Application.Interface;

namespace HotelReservation.Application.Dto.General
{
    public class DateRangeDto : IEntityDto
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
