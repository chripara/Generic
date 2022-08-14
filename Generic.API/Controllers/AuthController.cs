using AutoMapper;
using Generic.Application.Dto.Auth;
using Generic.Application.Services.Email;
using Generic.Domain.Models.Auth;
using Generic.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web;

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
        private readonly IEmailSender _emailSender;

        public AuthController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            AppDbContext context,
            IMapper mapper,
            IEmailSender emailSender
            )
        {
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _emailSender = emailSender;
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
            
            var registerationIdentityResult = await _userManager.CreateAsync(_mapper.Map<User>(dto));            

            if(!registerationIdentityResult.Succeeded)
            {
                return BadRequest(registerationIdentityResult.Errors);
            }

            _context.SaveChanges();

            var newUser = await _userManager.FindByEmailAsync(dto.Email); 
            await _userManager.AddPasswordAsync(newUser, dto.Password);

            var generatedToken = await _userManager.GenerateChangeEmailTokenAsync(newUser, newUser.Email);

            if (generatedToken == null)
            {
                return NotFound("Something went wrong no token generated. Please try again.");
            }

            newUser.EmailConfirmationToken = generatedToken;

            _context.Update<User>(newUser);
            await _context.SaveChangesAsync();

            var encodedToken = HttpUtility.HtmlAttributeEncode(generatedToken);
            var response = await _emailSender.EmailVerifyEmailSenderAsync(newUser.Email, newUser.UserName, HttpUtility.HtmlEncode(generatedToken));

            return Ok("Please verify your email.");
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
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var username = HttpContext.User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if(user == null)
            {
                return NotFound("User not found");
            }

            if(!user.EmailConfirmed)
            {
                return NotFound("User not confirmed the email.");
            }

            if(dto.NewPassword != dto.ConfirmNewPassword)
            {
                return NotFound("New pasword is not a match.");
            }

            var response = await _userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);

            return Ok("Password changed status: " + response.Succeeded);
        }

        [HttpGet]
        [Route("VerificationEmail")]
        public async Task<IActionResult> VerificationEmail([FromQuery] VerificationEmailDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if(user == null)
            {
                return NotFound("No user with that email.");
            }

            var confirmationToken = HttpUtility.HtmlDecode(dto.Token).Replace(" ", "+");

            if (user.EmailConfirmationToken == confirmationToken)
            {
                user.EmailConfirmed = true;

                _context.Update(user);
                await _context.SaveChangesAsync();
            }

            return Ok("User with email: " + dto.Email + " is succesfully confirmed.");
        }

        [HttpPost]        
        [Route("ForwordPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!user.EmailConfirmed)
            {
                return NotFound("User not confirmed the email.");
            }

            await _userManager.RemovePasswordAsync(user);

            var generatedToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            if (generatedToken == null)
            {
                return NotFound("Something went wrong no token generated. Please try again.");
            }

            user.ForgotPasswordConfirmationToken = generatedToken;

            _context.Update<User>(user);
            await _context.SaveChangesAsync();

            var encodedToken = HttpUtility.HtmlAttributeEncode(generatedToken);
            var response = await _emailSender.EmailForgotPasswordSenderAsync(user.Email, user.UserName, HttpUtility.HtmlEncode(generatedToken));

            return Ok("Please check your email for reset password code.");
        }

        //[HttpGet]
        //[Route("VerifyForgotPasswordToken")]
        //public async Task<IActionResult> VerifyForgotPasswordToken([FromQuery] EmailTokenDto dto)
        //{
        //    var user = await _userManager.FindByEmailAsync(dto.Email);

        //    if (user == null)
        //    {
        //        return NotFound("No user with that email.");
        //    }

        //    var confirmationToken = HttpUtility.HtmlDecode(dto.Token).Replace(" ", "+");

        //    if (user.EmailConfirmationToken == confirmationToken)
        //    {
        //        user.EmailConfirmed = true;

        //        _context.Update(user);
        //        await _context.SaveChangesAsync();
        //    }

        //    return Ok("User with email: " + dto.Email + " is succesfully confirmed.");
        //}


        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromQuery] ResetPasswordDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if(user == null)
            {
                return NotFound("User not found try again.");
            }

            var confirmationToken = HttpUtility.HtmlDecode(dto.Token).Replace(" ", "+");

            if(confirmationToken != user.ForgotPasswordConfirmationToken)
            {
                return NotFound("Forgot password confirmation token is not a match please try again.");
            }

            if (user.EmailConfirmationToken != confirmationToken)
            {
                return NotFound("Email is not confirmed");
            }
            user.EmailConfirmed = true;

            if(dto.ConfirmPassword != dto.Password)
            {
                return NotFound("Passwords are not a match try again.");
            }
            
            var result = await _userManager.AddPasswordAsync(user, dto.Password);

            _context.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Password reset was successful: " + result);
        }

        [HttpPost]
        [Route("VerifyPhoneNumber")]
        public async Task<IActionResult> VerifyPhoneNumber(EmailTokenDto dto)
        {
            var user = _userManager.FindByEmailAsync(dto.Email);

            if(user == null)
            {
                return NotFound("User not found");
            }

            //if(user.)

            return Ok("");
        }

    }
}
