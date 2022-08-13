using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic.Application.Dto.Bookings
{
    public class GetBookingsRequestDateDto
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }   
    }
}
