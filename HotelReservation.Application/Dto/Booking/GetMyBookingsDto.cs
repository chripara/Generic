namespace HotelReservation.Application.Dto.Booking;

public class GetMyBookingsDto
{
    public int Id { get; set; }
    public string Hotel { get; set; }
    public string HotelAddress { get; set; }
    public string RoomNumber { get; set; }
    public string Cost { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}