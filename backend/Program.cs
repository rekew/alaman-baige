using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Backend.Core;
using Backend.Repositories;
using Backend.Services;
using Backend.Interfaces;
using System.Text;
using Backend.Services.Tables;
using Amazon.S3;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddAuthorization();

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

//Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{

    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ).UseSnakeCaseNamingConvention();

});

//JWT
var jwtKey = builder.Configuration["Jwt:Key"];

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtKey!))
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                if (string.IsNullOrEmpty(context.Token))
                {
                    context.Token = context.Request.Cookies["access_token"];
                }

                return Task.CompletedTask;
            }
        };
    });

//Cloudflare R2
builder.Services.AddSingleton<IAmazonS3>(_ =>
{
    var config = new AmazonS3Config
    {
        ServiceURL = builder.Configuration["CloudflareR2:EndpointUrl"],
        ForcePathStyle = true
    };

    return new AmazonS3Client(
        builder.Configuration["CloudflareR2:AccessKeyId"],
        builder.Configuration["CloudflareR2:SecretAccessKey"],
        config
    );
});

//Cookies
builder.Services.AddSingleton(new CookieOptions
{
    HttpOnly = true,
    Secure = !builder.Environment.IsDevelopment(),
    SameSite = SameSiteMode.Strict
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();

//Scope add

//Services
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<HorseService>();
builder.Services.AddScoped<StatisticService>();

//Core
builder.Services.AddScoped<AmazonS3>();
builder.Services.AddScoped<Jwt>();

//Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IHorseRepository, HorseRepository>();

//Routing Path
builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
});

//Policy
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AdminOnly", policy =>
        policy.RequireRole("admin"));

//APP
var app = builder.Build();

app.UseCors("Frontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
