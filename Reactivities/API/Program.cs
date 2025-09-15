// using API.Maping;
// using API.Middlware;
// using API.SignalR;
// using Application;
// using Application.Activities.Comands;
// using Application.Activities.Queries;
// using Application.Interfaces;
// using Application.Validators;
// using CloudinaryDotNet;
// using Domain;
// using FluentValidation;
// using Infrastracture;
// using Infrastracture.PhotoServise;
// using Infrastracture.Security;
// using Mapster;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc.Authorization;
// using Microsoft.EntityFrameworkCore;
// using Persistence;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// ===== ����������� ����� =====
builder.Services.AddControllers();              // ���� ����� �����������
builder.Logging.ClearProviders();
builder.Logging.AddConsole();                   // �� ������ ������


builder.Services.AddDbContext<AppDbContext>(x => {
    //x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    x.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// ===== �������� ����������� ������� =====
// app.UseMiddleware<ExeptionHendlerMiddlware>();  // ���������
// app.UseCors(...);                               // ���������
// app.UseAuthentication();                        // ���������
// app.UseAuthorization();                         // ���������

app.MapControllers();                            // ���� � ���� ���� �����������

// ���� � healthz
var logger = app.Services.GetRequiredService<ILoggerFactory>()
                         .CreateLogger("Startup");
logger.LogInformation("APP STARTED {Time}", DateTimeOffset.Now);

app.MapGet("/healthz", () => Results.Ok("OK"));

app.Run();
