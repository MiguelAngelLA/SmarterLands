using System.Net.WebSockets;
using System.Text;

namespace websocket_server.Server_Functions
{
    public abstract class Socket
    {
        public WebsocketsConnection Connection { get; set; }
        public Socket(WebsocketsConnection connection) { this.Connection = connection; }

        public virtual async Task OnConnect(WebSocket websocket)
        {
            await Task.Run(() =>
            {
                Connection.addSocket(websocket);
            });
        }

        public virtual async Task OnDisconnect(WebSocket webSocket, IHostApplicationLifetime lifetime) => await Connection.removeSocketAsync(Connection.getID(webSocket), lifetime);

        public virtual async Task sendMessage(WebSocket webSocket, string message) {
            if(webSocket.State == WebSocketState.Open)
            {
                await webSocket.SendAsync(new ArraySegment<byte>(Encoding.ASCII.GetBytes(message), 0, message.Length), WebSocketMessageType.Text, true, CancellationToken.None);
            }else
            {
                return;
            }
        }

        public virtual async Task BroadcastMessage(string message) { foreach (var connection in Connection.broadcast()){ await sendMessage(connection, message); } }

        public abstract Task Receive(WebSocket webSocket, WebSocketReceiveResult receiveResult, ArraySegment<byte> buffer);
    }
}
