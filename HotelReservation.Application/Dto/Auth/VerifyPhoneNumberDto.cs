namespace HotelReservation.Application.Dto.Auth
{
    public class VerifyPhoneNumberDto
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
