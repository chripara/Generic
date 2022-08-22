namespace HotelReservation.Domain.Models.Bookings
{
    public class HotelRoom: IEntity
    {
        public int Id { get; set; } 
        public string RoomNumber { get; set; }
        public string Capacity { get; set; }
        public float Cost { get; set; }
        public string Description { get; set; } 
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public ICollection<Booking> Bookings { get; set; }  
    }
}
