using Destructurama.Attributed;
using HotelReservation.Application.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Auth
{
    public class ResetPasswordDto : IEntityDto
    {
        [LogMasked]
        public string Token { get; set; }
        public string Email { get; set; }
        [LogMasked]
        public string Password { get; set; }
        [LogMasked]
        public string ConfirmPassword { get; set; }
    }
}
