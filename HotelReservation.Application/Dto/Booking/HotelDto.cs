using HotelReservation.Application.Interface;
using HotelReservation.Domain.Models.Bookings;

namespace HotelReservation.Application.Dto.Hotels
{
    public class HotelDto : IEntityDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Rate { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public List<HotelRoomDto> HotelRoomDtos { get; set; } = new List<HotelRoomDto>();
        public List<OfferDto> OfferDtos { get; set; } = new List<OfferDto>();
    }
}