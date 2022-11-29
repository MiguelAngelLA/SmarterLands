using System.Net.WebSockets;
using System.Text;

namespace websocket_server.Server_Functions
{
    public class MessageSocket : Socket
    {
        public MessageSocket(WebsocketsConnection connection) : base(connection)
        {
        }

        public override async Task Receive(WebSocket webSocket, WebSocketReceiveResult receiveResult, ArraySegment<byte> buffer)
        {
            var socketID = Connection.getID(webSocket);
            await BroadcastMessage($"{socketID} sent the message {Encoding.UTF8.GetString(buffer.ToArray(), 0, receiveResult.Count)}");
        }

        public override async Task OnConnect(WebSocket websocket)
        {
            await base.OnConnect(websocket);
            await BroadcastMessage("Nueva conexion detectada");
        }
    }
}
