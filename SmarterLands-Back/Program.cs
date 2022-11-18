using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable JSON configuration
StreamReader sr = new StreamReader("config.json");
string json = sr.ReadToEnd();
ProjectConfig.Configuration = JsonConvert.DeserializeObject<ProjectConfig>(json);



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "Assets")),
    RequestPath = "/assets"
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
