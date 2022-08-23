using AutoMapper;
using HotelReservation.Application.Dto.Auth;
using HotelReservation.Application.Interface;
using HotelReservation.Application.Services.Email;
using HotelReservation.Application.Services.Phone;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Net;
using System.Web;

namespace HotelReservation.API.Controllers
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
        private readonly ISmsSender _smsSender;

        public AuthController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            AppDbContext context,
            IMapper mapper,
            IEmailSender emailSender,
            ISmsSender smsSender
            )
        {
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _emailSender = emailSender;
            _smsSender = smsSender;
        }
                
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            Log.Information("RegisterDto " + FilterDto(dto)+ ;

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

            var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            var TwoFactorToken = await _userManager.GenerateTwoFactorTokenAsync(newUser, newUser.Email);

            if (emailConfirmationToken == null)
            {
                return NotFound("Something went wrong no token generated. Please try again.");
            }

            newUser.EmailConfirmationToken = emailConfirmationToken;
            newUser.EmailExpirationTime = DateTime.Now.AddHours(1);

            _context.Update<User>(newUser);
            await _context.SaveChangesAsync();

            var encodedToken = HttpUtility.HtmlAttributeEncode(emailConfirmationToken);
            var subject = "Verification email for generic app.";
            var plainTextContent = "Please click to this link to verify your email: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + encodedToken;
            var htmlContent = "<strong>Please click to this link to verify your email: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + encodedToken + "&email=" + newUser.Email + "</strong>";
            
            var response = await _emailSender.EmailSenderAsync(newUser.Email, newUser.UserName, HttpUtility.HtmlEncode(emailConfirmationToken), subject, plainTextContent, htmlContent);

            newUser.PhoneNumberTokenVerificationCode = "asdasda";

            await _smsSender.SmsSenderAsync("+306955954852", "Verify your phone code:" + newUser.PhoneNumberTokenVerificationCode);

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

            return Ok("User with email: " + dto.Email + " is successfully confirmed.");
        }

        [HttpPost]        
        [Route("ForgordPassword")]
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
            var subject = "Verification email for generic app.";
            var plainTextContent = "Please click to reset your password: " + "https://localhost:44347/api/Auth/ResetPassword?token=" + encodedToken + "&email=" + user.Email;
            var htmlContent = "<strong>Please click to reset your password: " + "https://localhost:44347/api/Auth/ResetPassword?token=" + encodedToken + "&email=" + user.Email + "</strong>";

            await _emailSender.EmailSenderAsync(user.Email, user.UserName, HttpUtility.HtmlEncode(generatedToken),
                subject, plainTextContent, htmlContent);

            return Ok("Please check your email for reset password code.");
        }

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
        public async Task<IActionResult> VerifyPhoneNumber(VerifyPhoneNumberDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if(user == null)
            {
                return NotFound("User not found");
            }

            if(user.VerifyPhoneToken != dto.Token)
            {
                return NotFound("Phone verification codes are not a match plz try again.");
            }

            user.PhoneNumberConfirmed = true;
            user.VerifyPhoneToken = "";

            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync();

            return Ok("Phone number verified.");
        }

        [HttpPost]
        [Authorize]
        [Route("ChangeEmail")]
        public async Task<IActionResult> ChangeEmail(ChangeEmailDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.CurrentEmail);

            if(user == null)
            {
                return NotFound("User not Found");
            }

            user.NewEmail = dto.NewEmail;            
            user.EmailExpirationTime = DateTime.Now.AddHours(1);
            user.EmailConfirmationToken = await _userManager.GenerateChangeEmailTokenAsync(user, dto.NewEmail);

            if (user.EmailConfirmationToken == null)
            {
                return NotFound("Something went wrong no token generated. Please try again.");
            }

            _context.Update<User>(user);
            await _context.SaveChangesAsync();

            var encodedToken = HttpUtility.HtmlAttributeEncode(user.EmailConfirmationToken);
            var subject = "Verification email for generic app.";
            var plainTextContent = "Please click to this link to verify your email: "
                + "https://localhost:44347/api/Auth/VerifyChangedEmail?token=" + encodedToken;
            var htmlContent = "<strong>Please click to this link to verify your email: "
                + "https://localhost:44347/api/Auth/VerifyChangedEmail?token=" + encodedToken + 
                "&email=" + user.NewEmail + "</strong>";

            var response = await _emailSender.EmailSenderAsync(user.NewEmail, user.UserName,
                HttpUtility.HtmlEncode(user.EmailConfirmationToken), subject, plainTextContent, htmlContent);

            //var response2 = await _emailSender.EmailForgotPasswordSenderAsync(user.NewEmail, user.UserName,
            //    HttpUtility.HtmlEncode(user.EmailConfirmationToken));

            return Ok("Please check your new email for verification.");                                                                          
        }

        [HttpPost]
        [Route("VerifyChangedEmail")]
        public async Task<IActionResult> VerifyChangedEmail(VerificationEmailDto dto)
        {
            var user = _context.Users.FirstOrDefault(x=> x.NewEmail == dto.Email);

            if(user == null)
            {
                return NotFound("User not found email is not correct please try again.");
            }

            var confirmationToken = HttpUtility.HtmlDecode(dto.Token).Replace(" ", "+");

            if (user.EmailConfirmationToken != confirmationToken)
            {
                return NotFound("Email verification code not found.");
            }

            user.EmailConfirmationToken = null;
            user.Email = dto.Email;

            await _userManager.UpdateNormalizedEmailAsync(user);
            await _userManager.UpdateAsync(user);

            await _context.SaveChangesAsync();

            return Ok("New email verified successfully.");
        }

        [HttpGet]
        [Route("TestEndpoint")]
        public async Task<IActionResult> TestEndpoint()
        {
            var answer = await _smsSender.SmsSenderAsync("+306955954852", "Pare auto to sms gt douylevei to twilio: " + GeneratePhoneToken(6));

            return Ok(answer);
        }

        private int GeneratePhoneToken(int digits)
        {
            var randomGenerator = new Random();
            
            return randomGenerator.Next(100000,Convert.ToInt32(Math.Pow(10.0, Convert.ToDouble(digits))));
        }

        private string FilterDto(IEntityDto dto)
        {
            return "asdf";
        }
    }
}