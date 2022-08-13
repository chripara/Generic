using Generic.Domain.Models.Auth;

namespace Generic.Application.Dto.Bookings
{
    public class UpdateBookingDto
    {
        public int Id { get; set; }
        public string Room { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public User? User { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
