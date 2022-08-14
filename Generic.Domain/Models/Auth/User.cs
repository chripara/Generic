
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
        public string? VerifyPhoneToken { get; set; }
        public string? NewEmail { get; set; }
        public string? NewPhoneNumber { get; set; }
        public DateTime? EmailExpirationTime { get; set; }
        public DateTime? PhoneExpirationTime { get; set; }
        public ICollection<Booking>? Bookings { get; set; }
    }
}