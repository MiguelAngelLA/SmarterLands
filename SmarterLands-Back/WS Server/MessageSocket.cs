using Microsoft.Net.Http.Headers;
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
            string message = Encoding.UTF8.GetString(buffer.ToArray(), 0, receiveResult.Count);
            await BroadcastMessage( message );
   /*        SensorReading sensorReading = JsonConvert.DeserializeObject<SensorReading>(message);
            sensorReading.Time = new DateTime();
            string notificationBody = "";

            switch (sensorReading.Notification_id)
            {
                case 0:
                    notificationBody = "Data sent successfully";
                    break;

                case 1:
                    notificationBody = "Warning: incoming storm";
                    break;

                case 2:
                    notificationBody = "Error: Data malformed!";
                    break;

                default:
                    notificationBody = "Unknown Error";
                    break;
            }

            SensorReading.Post(
                sensorReading.Time,
                sensorReading.Temperature,
                sensorReading.Humidity,
                sensorReading.Moisture,
                sensorReading.Precipitation,
                sensorReading.Bin_id,
                notificationBody,
                (byte)sensorReading.Notification_id);
            */

            // 0 bueno 
            // 1 warning 
            // 2 fatal 
            // default unknown error
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
