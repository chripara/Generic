using AutoMapper;
using HotelReservation.Application.Dto.Bookings;
using HotelReservation.Application.Dto.Hotels;
using HotelReservation.Domain.Models;

namespace HotelReservation.Application.Profiles
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<Booking, CreateBookingDto>().ReverseMap();
            CreateMap<Booking, GetBookingsDto>().ReverseMap();
            CreateMap<Booking, UpdateBookingDto>().ReverseMap();
            CreateMap<Booking, DeleteBookingDto>().ReverseMap();
            CreateMap<Booking, BookedDatesDto>().ForMember(f => f.RoomNumber, mf => mf.MapFrom(p => p.HotelRoom.RoomNumber));
        }
    }
}
