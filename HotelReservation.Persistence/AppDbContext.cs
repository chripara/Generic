using HotelReservation.Domain;
using HotelReservation.Domain.Models;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Domain.Models.Bookings;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace HotelReservation.Persistence
{
    public class AppDbContext : IdentityDbContext<User,Role,int>
    {
        public AppDbContext()
        {

        }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)   
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Booking> Booking { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<HotelRoom> HotelRooms { get; set; }
    }
}