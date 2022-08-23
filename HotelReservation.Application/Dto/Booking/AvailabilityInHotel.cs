namespace HotelReservation.Application.Dto.Hotels
{
    public class AvailabilityInHotel
    {
        public string HotelName { get; set; }
        public List<BookedDatesDto> BookedDatesDtos { get; set; } = new List<BookedDatesDto>();
        public List<HotelRoomDto> HotelRoomDtos { get; set; } = new List<HotelRoomDto>();
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<OfferDto> Offers { get; set; } = new List<OfferDto>();
    }
}
