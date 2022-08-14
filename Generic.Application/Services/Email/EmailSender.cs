using SendGrid;
using SendGrid.Helpers.Mail;

namespace Generic.Application.Services.Email
{
    public class EmailSender : IEmailSender
    {
        public async Task<Response> EmailForgotPasswordSenderAsync(string email, string username, string token)
        {
            var apiKey = Environment.GetEnvironmentVariable("Sendgrid_API_Key");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("zarmerdic@gmail.com", "Generic app email verification service.");
            var subject = "Verification email for generic app.";
            var to = new EmailAddress("nagelharbor@hotmail.com", "Example User2");
            var plainTextContent = "Please click to reset your password: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + token + "&email=" + email;
            var htmlContent = "<strong>Please click to reset your password: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + token + "&email=" + email + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }

        public async Task<Response> EmailVerifyEmailSenderAsync(string email, string username, string token)
        {
            var apiKey = Environment.GetEnvironmentVariable("Sendgrid_API_Key");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("zarmerdic@gmail.com", "Generic app email verification service.");
            var subject = "Verification email for generic app.";
            var to = new EmailAddress("nagelharbor@hotmail.com", "Example User2");
            var plainTextContent = "Please click to this link to verify your email: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + token;
            var htmlContent = "<strong>Please click to this link to verify your email: " + "https://localhost:44347/api/Auth/VerificationEmail?token=" + token + "&email=" + email +"</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }
    }
}
