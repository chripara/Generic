using Generic.Domain.Models.Bookings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Generic.Domain.Mappings.Bookings
{
    public class HotelRoomMapping : IEntityTypeConfiguration<HotelRoom>
    {
        public void Configure(EntityTypeBuilder<HotelRoom> builder)
        {
            builder.HasOne(x => x.Hotel)
                .WithMany(x => x.HotelRooms)
                .HasForeignKey(x => x.HotelId);

            builder.Property(p => p.RoomNumber).HasMaxLength(10);
            builder.Property(p => p.Capacity).HasMaxLength(10);
            builder.Property(p => p.Cost).HasMaxLength(10);
            builder.Property(p => p.Description).HasMaxLength(10);            
        }
    }
}
