using Newtonsoft.Json;
using System.Net.WebSockets;
using System.Text;
using System.Text.RegularExpressions;

namespace websocket_server.Server_Functions
{
    public class MessageSocket : Socket
    {
        public MessageSocket(WebsocketsConnection connection) : base(connection)
        {
        }

        public override async Task Receive(WebSocket webSocket, WebSocketReceiveResult receiveResult, ArraySegment<byte> buffer)
        {
            var message = @"'" + Encoding.UTF8.GetString(buffer.ToArray(), 0, receiveResult.Count) + "'";
            await BroadcastMessage(message);
            //string escapedMessage = Regex.Escape(Encoding.UTF8.GetString(buffer.ToArray(), 0, receiveResult.Count));
            Console.WriteLine(message);

            //527
        }

        public override async Task OnConnect(WebSocket websocket)
        {
            await base.OnConnect(websocket);
            await BroadcastMessage("Nueva conexion detectada");
        }
    }
}
