namespace Generic.Domain.Models.Bookings
{
    public class Hotel : IEntity<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Rate { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public ICollection<HotelRoom> HotelRooms { get; set; }
        public ICollection<Offer> Offers { get; set; }
    }
}