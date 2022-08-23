namespace HotelReservation.Application.Dto.Bookings
{
    public class CreateBookingDto
    {
        public string Room { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public int? UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
