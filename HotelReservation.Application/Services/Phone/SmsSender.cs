using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace HotelReservation.Application.Services.Phone
{
    public class SmsSender : ISmsSender
    {
        private readonly IConfiguration _configuration;

        public SmsSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<MessageResource> SmsSenderAsync(string to, string body)
        {
            var accountSid = _configuration["Twilio_Account_SID"];          
            var authToken = _configuration["Twilio_Auth_Token"];
            var phoneNumber = _configuration["Twilio_Phone_Number"];

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: body,
                from: new Twilio.Types.PhoneNumber(phoneNumber),
                to: new Twilio.Types.PhoneNumber(to)
            );

            return message;
        }
    }
}