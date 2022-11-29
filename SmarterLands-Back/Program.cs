using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using websocket_server.Server_Functions; 

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddWebSocketManager();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200");
                      });
});

// Enable JSON configuration
StreamReader sr = new StreamReader("config.json");
string json = sr.ReadToEnd();
ProjectConfig.Configuration = JsonConvert.DeserializeObject<ProjectConfig>(json);



var app = builder.Build();

// websocket feature
app.UseWebSockets();
app.MapSockets("/ws", app.Services.GetService<MessageSocket>());
//app.Urls.Add("http://0.0.0.0:5003");

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


app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
