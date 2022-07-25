using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Generic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {

        public BookingController()
        {
            

        }

        [HttpGet]
        public async Task<IActionResult> GetBooking()
        {
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            return Ok();
        }
    }
}
