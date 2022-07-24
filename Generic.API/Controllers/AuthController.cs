using AutoMapper;
using Generic.Application.Dto.Auth;
using Generic.Domain.Models.Auth;
using Generic.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Generic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AuthController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            AppDbContext context,
            IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context; 
        }

        
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var userByUserName = await _userManager.FindByNameAsync(dto.UserName);
            var userByEmail = await _userManager.FindByEmailAsync(dto.UserName);
            var userByPhoneNumber = _userManager.Users.FirstOrDefault(w => w.PhoneNumber == dto.PhoneNumber);

            if (userByUserName != null )
                return BadRequest("UserName is already in use.");
            
            if (userByEmail != null)
                return BadRequest("Email is already in use.");
            
            if (userByPhoneNumber != null)
                return BadRequest("Phone number is already in use.");

            if (dto.Password == null)
            {
                return BadRequest("Password Empty.");
            }

            if (dto.Password != dto.ConfirmPassword)
            {   
                return BadRequest("Passwords are not a match.");
            }

            var registerationIdentityResult = await _userManager.CreateAsync(new User
            {
                UserName = dto.UserName,
                Email = dto.Email,
                FirstName = dto.FirstName,  
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,  
                Location = dto.Location
            }, dto.Password);

            if(!registerationIdentityResult.Succeeded)
            {
                return BadRequest(registerationIdentityResult.Errors);
            }

            _context.SaveChanges();

            var newUser = await _userManager.FindByEmailAsync(dto.Email); 
            return Ok(newUser);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.UserName);

            if(user == null)
            {
                return Ok("Username is invalid.");
            }

            if(!user.EmailConfirmed)
            {
                return Ok("Email is not comfirmed.");
            }

            if(!(await _userManager.CheckPasswordAsync(user, dto.Password)))
            {
                return Ok("Password not a match.");
            }

            await _signInManager.SignInAsync(user, false);

            return Ok("Sign in is successfull.");
        }



        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok("Signout succesful.");
        }

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {

            return NotFound("komplentan");
        }


        [HttpPost]
        [Route("ForwordPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            /* Send email with code */

            return Ok("Please check your email for reset password code.");
        }


        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {

            return NotFound("komplentan");
        }


        [HttpPost]
        [Route("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailDto dto)
        {

            return NotFound("komplentan");
        }

    }
}
