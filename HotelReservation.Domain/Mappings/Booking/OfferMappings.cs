using HotelReservation.Domain.Models.Bookings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HotelReservation.Domain.Mappings.Bookings
{
    public class OfferMappings : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.HasOne(x => x.Hotel)
                .WithMany(x => x.Offers)
                .HasForeignKey(x => x.HotelId);

            builder.Property(x => x.Description).HasMaxLength(2000);
        }
    }
}
