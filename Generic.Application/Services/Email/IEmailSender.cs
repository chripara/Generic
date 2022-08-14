using SendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic.Application.Services.Email
{
    public interface IEmailSender
    {
        Task<Response> EmailVerifyEmailSenderAsync(string email, string username, string token);
        Task<Response> EmailForgotPasswordSenderAsync(string email, string username, string token);
    }
}
