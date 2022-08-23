using Destructurama.Attributed;
using HotelReservation.Application.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Auth
{
    public class LoginDto : IEntityDto
    {
        public string UserName { get; set; }
        [LogMasked]
        public string Password { get; set; }
    }
}
