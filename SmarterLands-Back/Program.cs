using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(config =>
{
    config.SwaggerDoc("SmarterLands", new OpenApiInfo
    {
        Title = "SmarterLands",
        Version = "v1"
    });
});


// Enable JSON configuration
StreamReader sr = new StreamReader("config.json");
string json = sr.ReadToEnd();
ProjectConfig.Configuration = JsonConvert.DeserializeObject<ProjectConfig>(json);


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});


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
