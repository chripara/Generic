using System.Runtime;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace HotelReservation.Application.Dto.Auth;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Location { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}