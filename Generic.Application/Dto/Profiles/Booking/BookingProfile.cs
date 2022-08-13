using AutoMapper;
using Generic.Application.Dto.Bookings;
using Generic.Domain.Models;

namespace Generic.Application.Dto.Profiles
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
