namespace Generic.Domain.Models.Bookings
{
    public class Offer: IEntity
    {
        public int Id { get; set; }
        public string Description{ get; set; }
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }    
        public DateTime StartPeriod { get; set; }
        public DateTime EndPeriod { get; set; }
        public int Rate{ get; set; }
    }
}
