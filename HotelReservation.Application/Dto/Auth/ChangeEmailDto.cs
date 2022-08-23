using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Dto.Auth
{
    public class ChangeEmailDto : IEntityDto
    {
        public string CurrentEmail { get; set; }
        public string NewEmail { get; set; }
    }
}
