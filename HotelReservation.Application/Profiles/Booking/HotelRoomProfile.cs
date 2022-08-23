using AutoMapper;
using HotelReservation.Application.Dto.Hotels;
using HotelReservation.Domain.Models.Bookings;

namespace HotelReservation.Application.Profiles
{
    public class HotelRoomProfile : Profile
    {
        public HotelRoomProfile()
        {
            CreateMap<HotelRoom, HotelRoomDto>()
                .ForMember(f => f.Bookings, act => act.Ignore())
                .ForMember(f => f.HotelDto, act => act.Ignore())
                .ReverseMap();
        }
    }
}
