using Generic.Domain.Models;
using Generic.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Generic.Domain.Mappings
{
    public class BookingMapping : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.HasOne(p => p.User)
                .WithMany(p => p.Bookings)
                .HasForeignKey(x => x.UserId);

            builder.Property(p => p.Room).HasMaxLength(20);
            builder.Property(p => p.FirstName).HasMaxLength(50);
            builder.Property(p => p.LastName).HasMaxLength(50);
            builder.Property(p => p.Description).HasMaxLength(2000);
            builder.Property(p => p.Id).ValueGeneratedOnAdd();  
        }
    }
}
