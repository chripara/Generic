namespace HotelReservation.Application.Dto.Hotels
{
    public class AvailabilityInHotel
    {
        public string HotelName { get; set; }
        public IList<BookedDatesDto> BookedDatesDtos { get; set; }
        public IList<HotelRoomDto> HotelRoomDtos { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
