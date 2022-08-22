using HotelReservation.Application.Dto.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
