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
        }
    }
}
