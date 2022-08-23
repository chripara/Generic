using Destructurama.Attributed;
using HotelReservation.Application.Interface;

namespace HotelReservation.Application.Dto.Auth
{
    public class EmailTokenDto : IEntityDto
    {
        public string Email { get; set; }   
        public string Token { get; set; }
    }
}
