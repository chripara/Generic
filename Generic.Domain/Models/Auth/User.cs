
using Microsoft.AspNetCore.Identity;

namespace Generic.Domain.Models.Auth
{
    public class User : IdentityUser<int>, IEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Location { get; set; }
        public string? EmailConfirmationToken { get; set; }
        public string? ForgotPasswordConfirmationToken { get; set; }
        public ICollection<Booking>? Bookings { get; set; }
    }
}
