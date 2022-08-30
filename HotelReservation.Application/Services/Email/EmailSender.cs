using HotelReservation.Application.AppConstants;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace HotelReservation.Application.Services.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;
        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration; 
        }
        public async Task<Response> EmailSenderAsync(string email, string username, string token,
            string subject, string plainTextContent, string htmlContent)
        {
            var apiKey = _configuration["Sendgrid_API_Key"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(AuthConstants.DefaultEmail, "Generic app email verification service.");
            var to = new EmailAddress(email, username);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }
    }
}