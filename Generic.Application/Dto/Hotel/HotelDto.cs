using HotelReservation.Domain.Models.Bookings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Hotel
{
    public class HotelDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Rate { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public ICollection<HotelRoomDto> HotelRooms { get; set; }
        public ICollection<Offer> Offers { get; set; }
    }
}
