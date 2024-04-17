using AutoMapper;
using HotelReservation.AppConstants;
using HotelReservation.Application.Dto.Auth;
using HotelReservation.Application.Services.Email;
using HotelReservation.Application.Services.Phone;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Serilog;
using System.Web;
using HotelReservation.Application.AppConstants;
using Microsoft.VisualBasic;

namespace HotelReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly AppDbContext _context;        
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;

        public AuthController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            AppDbContext context,
            IMapper mapper,
            IEmailSender emailSender,
            ISmsSender smsSender
            )
        {
            _roleManager = roleManager;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _emailSender = emailSender;
            _smsSender = smsSender;
        }

        private class Test1
        {
            public string Test { get; set; }
        }

        [HttpGet]
        [Route("Test")]
        public async Task<IActionResult> Test()
        {
            var test = new Test1
            {
                Test = "Test"
            };
            
            return new JsonResult(test);
        }  

        //Auto verify create acc to bypass email and sms verification proccess
        //email and sms verification works but it is a demo without the external services.
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            Log.Information("RegisterDto: {@RegisterDto}", FilterDto(JObject.FromObject(dto)));

            var userByUserName = await _userManager.FindByNameAsync(dto.UserName);
            var userByEmail = await _userManager.FindByEmailAsync(dto.Email); 
            var userByPhoneNumber = _userManager.Users.FirstOrDefault(w => w.PhoneNumber == dto.PhoneNumber);

            if (userByUserName != null)
            {
                Log.Information("UserName is already in use.");
                return BadRequest("UserName is already in use.");
            }
            
            if (userByEmail != null)
            {
                Log.Information("Email is already in use.");
                return BadRequest("Email is already in use.");
            }
            
            if (userByPhoneNumber != null)
            {
                Log.Information("Phone number is already in use.");
                return BadRequest("Phone number is already in use.");
            }

            if (dto.Password == null)
            {
                Log.Information("Password Empty.");
                return BadRequest("Password Empty.");
            }

            if (dto.Password != dto.ConfirmPassword)
            {
                Log.Information("Passwords are not a match.");
                return BadRequest("Passwords are not a match.");
            }
            
            var registerationIdentityResult = await _userManager.CreateAsync(_mapper.Map<User>(dto), dto.Password);            

            if(!registerationIdentityResult.Succeeded)
            {
                Log.Information("Errors {@errors}", registerationIdentityResult.Errors);
                return BadRequest(registerationIdentityResult.Errors);
            }

            var newUser = await _userManager.FindByEmailAsync(dto.Email);
            // _userManager.AddToRoleAsync(newUser, RoleConstants.RoleUser);
            newUser.EmailConfirmed = true;
            newUser.PhoneNumberConfirmed = true;
            _context.Update(newUser);
            await _context.SaveChangesAsync();
            // await _userManager.AddPasswordAsync(newUser, dto.Password);

            //var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            //; "asdfasdf"; //for testing
            
            // if (emailConfirmationToken == null)
            // {
            //     Log.Information("Something went wrong no token generated. Please try again.");
            //     return NotFound("Something went wrong no token generated. Please try again.");
            // }
            //_context.SaveChanges();

            // newUser.EmailConfirmationToken = emailConfirmationToken;
            // _context.SaveChanges();
            // newUser.EmailExpirationTime = DateTime.Now.AddHours(24);
            // _context.SaveChanges();

            // _context.SaveChanges();

            // var encodedToken = HttpUtility.HtmlAttributeEncode(emailConfirmationToken);
            // var subject = "Verification email for generic app.";
            // var plainTextContent = "Please click to this link to verify your email: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + encodedToken;
            // var htmlContent = "<strong>Please click to this link to verify your email: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + encodedToken + "&email=" + newUser.Email + "</strong>";
            //
            // var response = await _emailSender.EmailSenderAsync(newUser.Email, newUser.UserName, HttpUtility.HtmlEncode(emailConfirmationToken), subject, plainTextContent, htmlContent);
            // newUser.PhoneNumberTokenVerificationCode = GeneratePhoneToken(AuthConstants.PhoneVerificationTokenDigits);
            //
            // await _smsSender.SmsSenderAsync(AuthConstants.DefaultPhone , "Verify your phone code:" + newUser.PhoneNumberTokenVerificationCode);

            Log.Information("Please verify your email.");
            return Ok("Please verify your email.");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            Log.Information("LoginDto: {@dto}", FilterDto(JObject.FromObject(dto)));

            var user = await _userManager.FindByNameAsync(dto.UserName);

            if(user == null)
            {
                Log.Information("Username is invalid.");
                return BadRequest("Username is invalid."); 
            }

            if(!user.EmailConfirmed)
            {
                Log.Information("Email is not comfirmed.");
                return BadRequest("Email is not comfirmed.");
            }

            if(!(await _userManager.CheckPasswordAsync(user, dto.Password)))
            {
                Log.Information("Password not a match.");
                return BadRequest("Password not a match.");
            }

            await _signInManager.SignInAsync(user, false);

            Log.Information("Sign in is successful with User {0}.",user.UserName);
            return Ok("Sign in is successful.");
        }

        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            
            Log.Information("Signout successful.");
            return Ok("Signout successful.");
        }

        [HttpPost]
        [Route("ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {            
            var username = HttpContext.User.Identity?.Name;
            var user = await _userManager.FindByNameAsync(username);

            if(user == null)
            {
                Log.Information("User not found.");
                return NotFound("User not found");
            }

            if(!user.EmailConfirmed)
            {
                Log.Information("User not confirmed the email.");
                return NotFound("User not confirmed the email.");
            }

            if(dto.NewPassword != dto.ConfirmNewPassword)
            {
                Log.Information("New pasword is not a match.");
                return NotFound("New pasword is not a match.");
            }

            var response = await _userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);

            Log.Information("Password changed status: " + response.Succeeded);
            return Ok("Password changed status: " + response.Succeeded);
        }

        [HttpGet]
        [Route("VerificationEmail")]
        public async Task<IActionResult> VerificationEmail([FromQuery] VerificationEmailDto dto)
        {
            Log.Information("VerificationEmailDto: {@dto}", FilterDto(JObject.FromObject(dto)));

            var user = await _userManager.FindByEmailAsync(dto.Email);

            if(user == null)
            {
                Log.Information("No user with that email.");
                return NotFound("No user with that email.");
            }

            var confirmationToken = HttpUtility.HtmlDecode(dto.Token).Replace(" ", "+");

            if (user.EmailConfirmationToken.Equals(confirmationToken))
            {
                user.EmailConfirmed = true;
                user.EmailConfirmationToken = "";

                _context.Update(user);
                await _context.SaveChangesAsync();
            }

            Log.Information("User with email: " + dto.Email + " is successfully confirmed.");
            return Ok("User with email: " + dto.Email + " is successfully confirmed.");
        }

        [HttpPost]        
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            Log.Information("ForgotPassword: {@dto}", FilterDto(JObject.FromObject(dto)));
            
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
            {
                Log.Information("User not found.");
                return NotFound("User not found."); //TODO: Remove that for security reasons
            }

            if (!user.EmailConfirmed)
            {
                Log.Information("User not confirmed the email.");
                return NotFound("User not confirmed the email."); //TODO: Remove that for security reasons
            }

            await _userManager.RemovePasswordAsync(user);

            var generatedToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            if (generatedToken == null)
            {
                Log.Information("Something went wrong no token generated. Please try again.");
                return NotFound("Something went wrong no token generated. Please try again."); //TODO: Remove that for security reasons
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

            Log.Information("Please check your email for reset password code.");
            return Ok("Please check your email for reset password code.");
        }
 
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto) 
        {
            Log.Information("ResetPasswordDto: {@dto}", FilterDto(JObject.FromObject(dto)));

            var user = await _userManager.FindByEmailAsync(dto.Email);

            if(user == null)
            {
                Log.Information("User not found try again.");
                return NotFound("User not found try again.");
            }

            var confirmationToken = HttpUtility.HtmlDecode(dto.Token).Replace(" ", "+");

            if(confirmationToken != user.ForgotPasswordConfirmationToken)
            {
                Log.Information("Forgot password confirmation token is not a match please try again.");
                return NotFound("Forgot password confirmation token is not a match please try again.");
            }

            if (user.Email != dto.Email)
            {
                Log.Information("Email is not confirmed."); 
                return NotFound("Email is not confirmed.");
            }
            user.EmailConfirmed = true;

            if(dto.ConfirmPassword != dto.Password)
            {
                Log.Information("Passwords are not a match try again.");
                return NotFound("Passwords are not a match try again.");
            }
            
            var result = await _userManager.AddPasswordAsync(user, dto.Password);

            _context.Update(user);
            await _context.SaveChangesAsync();

            Log.Information("Password reset was successful: " + result);
            return Ok("Password reset was successful: " + result);
        }

        [HttpPost]
        [Route("VerifyPhoneNumber")]
        public async Task<IActionResult> VerifyPhoneNumber(VerifyPhoneNumberDto dto)
        {
            Log.Information("VerifyPhoneNumberDto: {@dto}", FilterDto(JObject.FromObject(dto)));

            var user = await _userManager.FindByEmailAsync(dto.Email);

            if(user == null)
            {
                Log.Information("User not found.");
                return NotFound("User not found.");
            }

            if(user.VerifyPhoneToken != dto.Token)
            {
                Log.Information("Phone verification codes are not a match plz try again.");
                return NotFound("Phone verification codes are not a match plz try again.");
            }

            user.PhoneNumberConfirmed = true;
            user.VerifyPhoneToken = "";

            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync();

            Log.Information("Phone verification codes are not a match plz try again.");
            return Ok("Phone number verified.");
        }

        [HttpPost]
        [Authorize]
        [Route("ChangeEmail")]
        public async Task<IActionResult> ChangeEmail(ChangeEmailDto dto)
        {
            Log.Information("ChangeEmailDto: {@dto}", FilterDto(JObject.FromObject(dto)));
            
            var user = await _userManager.FindByEmailAsync(dto.CurrentEmail);

            if(user == null)
            {
                Log.Information("User not Found.");
                return NotFound("User not Found.");
            }

            user.NewEmail = dto.NewEmail;            
            user.EmailExpirationTime = DateTime.Now.AddHours(1);
            user.EmailConfirmationToken = await _userManager.GenerateChangeEmailTokenAsync(user, dto.NewEmail);

            if (user.EmailConfirmationToken == null)
            {
                Log.Information("Something went wrong no token generated. Please try again.");
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

            Log.Information("Please check your new email for verification.");
            return Ok("Please check your new email for verification.");                                                                          
        }

        [HttpPost]
        [Route("VerifyChangedEmail")]
        public async Task<IActionResult> VerifyChangedEmail(VerificationEmailDto dto)
        {
            Log.Information("VerificationEmailDto: {@dto}", FilterDto(JObject.FromObject(dto)));
            
            var user = _context.Users.FirstOrDefault(x=> x.NewEmail == dto.Email);

            if(user == null)
            {
                Log.Information("User not found email is not correct please try again.");
                return NotFound("User not found email is not correct please try again.");
            }

            var confirmationToken = HttpUtility.HtmlDecode(dto.Token).Replace(" ", "+");

            if (user.EmailConfirmationToken != confirmationToken)
            {
                Log.Information("Email verification code not found.");
                return NotFound("Email verification code not found.");
            }

            user.EmailConfirmationToken = null;
            user.Email = dto.Email;

            await _userManager.UpdateNormalizedEmailAsync(user);
            await _userManager.UpdateAsync(user);

            await _context.SaveChangesAsync();

            Log.Information("New email verified successfully.");
            return Ok("New email verified successfully.");
        }
        
        [HttpPost]
        [Route("SeedAdminAccount")]
        public async Task<IActionResult> SeedAdminAccount()
        {
           
            if (_roleManager.FindByNameAsync(RoleConstants.RoleAdmin).Result == null)
            {
                await _roleManager.CreateAsync(new Role
                {
                    Name = RoleConstants.RoleAdmin
                });
            }
            
            if (_roleManager.FindByNameAsync(RoleConstants.RoleUser).Result == null)
            {
                await _roleManager.CreateAsync(new Role
                {
                    Name = RoleConstants.RoleUser
                });
            }

            if (_userManager.FindByNameAsync("admin").Result == null)
            {
                await _userManager.CreateAsync(new User
                {
                    Email = "admin@admin.ad",
                    UserName = "admin",
                    FirstName = "Admin",
                    LastName = "Admin",
                    EmailConfirmed = true,
                    PhoneNumber = "1029384756",
                    PhoneNumberConfirmed = true,
                    Location = "Admin Location",
                }, "123$Qwer");
            
                var user = await _userManager.FindByNameAsync("admin");
            
                await _userManager.AddToRoleAsync(user, RoleConstants.RoleAdmin);
            }

            return Ok();
        }

        private string GeneratePhoneToken(int digits)
        {
            var randomGenerator = new Random();
            var number = randomGenerator.Next(0, Convert.ToInt32(Math.Pow(10.0, Convert.ToDouble(digits)))).ToString();
            var token = "";

            for(var i=0; i<digits - number.ToString().Length; i++)
            {
                token += "0";
            }

            return token+number;
        }

        private string FilterDto(JObject dto)
        {
            dto.Remove("Password");
            dto.Remove("Token");
            dto.Remove("ConfirmPassword");
            dto.Remove("NewPassword");
            dto.Remove("ConfirmNewPassword");

            return dto.ToString();
        }
        
    }
}