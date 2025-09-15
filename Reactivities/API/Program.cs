using API.Maping;
using API.Middlware;
using API.SignalR;
using Application;
using Application.Activities.Comands;
using Application.Activities.Queries;
using Application.Interfaces;
using Application.Validators;
using CloudinaryDotNet;
using Domain;
using FluentValidation;
using Infrastracture;
using Infrastracture.PhotoServise;
using Infrastracture.Security;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(options => {
    var polisy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(polisy));
});

builder.Services.AddAuthorization(option => {
    option.AddPolicy("IsActivityHost", policy =>
        policy.Requirements.Add(new IsActivityHostRequirement()));
});

builder.Services.AddSingleton<Cloudinary>(x => {
    return new Cloudinary(new Account(
            builder.Configuration.GetValue<string>("Cloudinary:CLOUDINARY_CLOUD_NAME"),
             builder.Configuration.GetValue<string>("Cloudinary:CLOUDINARY_API_KEY"),
              builder.Configuration.GetValue<string>("Cloudinary:CLOUDINARY_API_SECRET")
        ));
});

//builder.Services.AddScoped<IAuthorizationRequirement, IsActivityHostRequirement>();
builder.Services.AddScoped<IAuthorizationHandler, IsActivityHostRequirementHendler>();

builder.Services.AddDbContext<AppDbContext>( x => {
    //x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    x.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

builder.Services.AddMediatR(x => {
    x.RegisterServicesFromAssemblyContaining<GetActivities>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityCommandValidator>();
builder.Services.AddTransient<ExeptionHendlerMiddlware>();
builder.Services.AddScoped<IUserInfo, UserInfo>();

builder.Services.AddIdentityApiEndpoints<User>(option => { 
    option.User.RequireUniqueEmail = true;
}).AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddScoped<IFileServise, PhotoServise>();

TypeAdapterConfig.GlobalSettings.Scan(typeof(ActivityMappingConfig).Assembly);

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExeptionHendlerMiddlware>();

app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();
using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider.GetService<AppDbContext>();
    var manager = scope.ServiceProvider.GetService<UserManager<User>>();
    await service.Database.MigrateAsync();

    await DbInitializer.SeedData(service, manager);
}

app.MapHub<CommentHub>("/comments");

app.Run();

