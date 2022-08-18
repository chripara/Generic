using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;

namespace Generic.Application.Services.Phone
{
    public interface ISmsSender
    {
        Task<MessageResource> SmsSenderAsync(string to, string body);
    }
}
