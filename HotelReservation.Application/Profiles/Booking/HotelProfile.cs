using AutoMapper;
using HotelReservation.Application.Dto.Hotels;
using HotelReservation.Domain.Models.Bookings;

namespace HotelReservation.Application.Profiles
{
    public class HotelProfile : Profile
    {
        public HotelProfile()
        {
            CreateMap<Hotel, HotelDto>().ReverseMap();   
        }

    }
}
