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
        Task<Response> EmailSenderAsync(string email, string username, string token);
    }
}
