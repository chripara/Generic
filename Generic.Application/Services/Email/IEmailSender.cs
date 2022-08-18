using SendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservation.Application.Services.Email
{
    public interface IEmailSender
    {
        Task<Response> EmailSenderAsync(string email, string username, string token,
            string subject, string plainTextContent, string htmlContent);
        //Task<Response> EmailForgotPasswordSenderAsync(string email, string username, string token);
    }
}
