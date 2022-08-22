using AutoMapper;
using HotelReservation.Application.Dto.Hotels;
using HotelReservation.Domain.Models.Bookings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
