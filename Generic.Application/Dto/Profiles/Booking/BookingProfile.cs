using AutoMapper;
using HotelReservation.Application.Dto.Bookings;
using HotelReservation.Domain.Models;

namespace HotelReservation.Application.Dto.Profiles
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<Booking, CreateBookingDto>().ReverseMap();
            CreateMap<Booking, GetBookingsDto>().ReverseMap();
            CreateMap<Booking, UpdateBookingDto>().ReverseMap();
            CreateMap<Booking, DeleteBookingDto>().ReverseMap();
        }
    }
}
