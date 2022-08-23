using HotelReservation.Application.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Bookings
{
    public class DeleteBookingDto : IEntityDto
    {
        public int Id { get; set; }
    }
}
