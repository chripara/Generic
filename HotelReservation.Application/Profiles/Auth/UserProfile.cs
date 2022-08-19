using AutoMapper;
using HotelReservation.Application.Dto.Auth;
using HotelReservation.Domain.Models.Auth;

namespace HotelReservation.Application.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            var map = CreateMap<RegisterDto, User>().ReverseMap();
        }
    }
}
