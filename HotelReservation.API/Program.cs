 using System.Reflection;
using AutoMapper;
using HotelReservation.Application.Profiles;
using HotelReservation.Application.Services.Email;
using HotelReservation.Application.Services.Phone;
using HotelReservation.Domain.Models.Auth;
using HotelReservation.Persistence;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Serilog;
using Serilog.Events;

var config = new MapperConfiguration(cfg =>
{
    cfg.AddMaps(typeof(UserProfile));
});

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .CreateBootstrapLogger();

builder.Host.UseSerilog(
    (ctx, lc) => lc
        // .WriteTo();
        .ReadFrom.Configuration(ctx.Configuration)
        
);

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();

builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection5")));

builder.Services.AddIdentity<User,Role>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddDefaultTokenProviders()
    .AddDefaultUI()
    .AddSignInManager()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings.
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings.
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings.
    options.User.AllowedUserNameCharacters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_+=-";
    options.User.RequireUniqueEmail = true;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    // Cookie settings
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
        
    options.LoginPath = "/Identity/Account/Login";
    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
    options.SlidingExpiration = true;
});

builder.Services.AddAutoMapper(typeof(UserProfile).Assembly);
builder.Services.AddCors();  

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.AddTransient<ISmsSender, SmsSender>();
builder.Services.AddSwaggerGen();


var app = builder.Build();

//
// using (var scope = app.Services.CreateScope())
// {
//     try
//     {
//         var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//         Console.WriteLine("Is SQL Server {0}", db.Database.IsSqlServer());
//         Console.WriteLine("Can connect {0}", 1);
//         Console.WriteLine("Can connect {0}", 2);
//         Console.WriteLine("Can connect {0}", 3);
//         //db.Database.OpenConnection();
//         //Console.WriteLine("Can connect {0}", db.Database.CanConnect());
//         // db.Database.Migrate();
//         //db.Database.CloseConnection();
//         // Console.WriteLine("Can connect {0}", db.Database.CanConnect());
//         // db.Database.Migrate();
//         await db.Database.MigrateAsync();        
//     }
//     catch(System.Exception e) 
//     {
//         Console.WriteLine(e);
//     }    
// }

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();
app.UseSerilogRequestLogging(options =>
{
    
});

app.UseCors(options => options  
    .AllowAnyOrigin()  
    .AllowAnyMethod()  
    .AllowAnyHeader()); 

// app.UseCors(o => 
//     o.WithOrigins("http://localhost:3000", "http://192.168.83.1:3000" )
//         .AllowAnyMethod()
//         .AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
