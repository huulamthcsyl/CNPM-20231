using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// Enable CORS
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers();

string connectionString = builder.Configuration.GetConnectionString("ProjectDB");
builder.Services.AddDbContext<ProjectContext>(options =>
{
    options.UseSqlServer(connectionString);
    //options.UseLazyLoadingProxies();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
