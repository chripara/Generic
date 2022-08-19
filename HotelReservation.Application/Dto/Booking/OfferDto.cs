using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Hotels
{
    public class OfferDto
    {
        public int? Id { get; set; }
        public string Description { get; set; }        
        public HotelDto? HotelDto { get; set; }
        public DateTime StartPeriod { get; set; }
        public DateTime EndPeriod { get; set; }
        public int? Rate { get; set; }
    }
}
