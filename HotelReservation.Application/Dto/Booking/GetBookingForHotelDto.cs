using HotelReservation.Application.Dto.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Booking
{
    public class GetBookingForHotelDto : DateRangeDto
    {
        public string HotelName { get; set; }
    }
}
