using System.Diagnostics;
using System.Net.WebSockets;

namespace websocket_server.Server_Functions
{
    public class SocketMiddleware
    {
        // TODO: What is RequestDelegate? 
        private readonly RequestDelegate _next; 
        private Socket Socket { get; set; }
        private IHostApplicationLifetime applicationLifetime;
        public SocketMiddleware(RequestDelegate next, Socket socket, IHostApplicationLifetime applicationLifetime)
        {
            _next = next;
            Socket = socket;
            this.applicationLifetime = applicationLifetime;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if(!context.WebSockets.IsWebSocketRequest) { context.Response.StatusCode = StatusCodes.Status400BadRequest; }

            var socket = await context.WebSockets.AcceptWebSocketAsync();

            await Socket.OnConnect(socket);

            await Receive(socket, async (result, buffer) =>
            {
                if(result.MessageType==WebSocketMessageType.Text)
                {
                    await Socket.Receive(socket, result, buffer);
                }
                else if(result.MessageType==WebSocketMessageType.Close) 
                {
                    await Socket.OnDisconnect(socket, applicationLifetime);
                }
            });
        }

        private async Task Receive(WebSocket webSocket, Action<WebSocketReceiveResult,ArraySegment<byte>> messageHandler) {
            var buffer = new byte[4096];

            while(webSocket.State == WebSocketState.Open)
            {
                try
                {
                    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), applicationLifetime.ApplicationStopping);
                    messageHandler(result, buffer);
                }
                catch { break; }
            }

            await Socket.OnDisconnect(webSocket, applicationLifetime);
        }
    }
}
