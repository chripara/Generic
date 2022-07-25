using Generic.Domain;
using Generic.Domain.Models.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Generic.Persistence
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
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }  
    }
}