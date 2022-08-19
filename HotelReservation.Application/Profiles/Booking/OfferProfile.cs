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
    public class OfferProfile : Profile
    {
        public OfferProfile()
        {
            CreateMap<Offer, OfferDto>().ReverseMap();
        }
    }
}
