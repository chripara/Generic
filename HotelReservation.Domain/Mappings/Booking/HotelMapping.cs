using HotelReservation.Domain.Models.Bookings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HotelReservation.Domain.Mappings.Bookings
{
    public class HotelMapping : IEntityTypeConfiguration<Hotel>
    {
        public void Configure(EntityTypeBuilder<Hotel> builder)
        {
            builder.Property(p => p.Address).HasMaxLength(128);
            builder.Property(p => p.City).HasMaxLength(64);
            builder.Property(p => p.Name).HasMaxLength(64);
            builder.Property(p => p.PostCode).HasMaxLength(10);
            builder.Property(p => p.PhoneNumber).HasMaxLength(20);
            builder.Property(p => p.Rate).HasMaxLength(10);
            builder.Property(p => p.Type).HasMaxLength(64);
            builder.Property(p => p.Description).HasMaxLength(2000);            
        }
    }
}
