using System.Reflection;

namespace websocket_server.Server_Functions
{
    public static class ApplicationSocketExtension
    {
        public static IServiceCollection AddWebSocketManager(this IServiceCollection services)
        {
            services.AddTransient<WebsocketsConnection>();
            foreach(var type in Assembly.GetEntryAssembly().ExportedTypes)
            {
                if(type.GetTypeInfo().BaseType == typeof(Socket))
                {
                    services.AddSingleton(type);
                }
            }
            
            return services;
        }

        public static IApplicationBuilder MapSockets(this IApplicationBuilder app, PathString path, Socket socket)
        {
            app.Map(path, (x) => x.UseMiddleware<SocketMiddleware>(socket));
            return app;
        }
    }
}
