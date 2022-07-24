using AutoMapper;
using Generic.Application.Dto.Auth;
using Generic.Domain.Models.Auth;

namespace Generic.Application.Profiles.Auth
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            var map = CreateMap<RegisterDto, User>().ReverseMap(); 
        }
    }
}
