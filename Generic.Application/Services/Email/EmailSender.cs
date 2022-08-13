using SendGrid;
using SendGrid.Helpers.Mail;

namespace Generic.Application.Services.Email
{
    public class EmailSender : IEmailSender
    {
        public async Task EmailSenderAsync(string email)
        {
            var apiKey = Environment.GetEnvironmentVariable("Sendgrid_API_Key");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("zarmerdic@gmail.com", "Example User1");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("nagelharbor@hotmail.com", "Example User2");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
