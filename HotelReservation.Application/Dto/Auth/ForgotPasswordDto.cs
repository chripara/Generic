using HotelReservation.Application.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Auth
{
    public class ForgotPasswordDto : IEntityDto
    {
        public string Email { get; set; }
    }
}
