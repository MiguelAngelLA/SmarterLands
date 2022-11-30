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
            //{"time": "2015-05-16T05:50:06", "temperature": 10, "humidity": 11, "moisture": 0, "precipitation": 13, "bin_id": 1004, "notification_type": 0}

            string message = Encoding.UTF8.GetString(buffer.ToArray(), 0, receiveResult.Count);
            await BroadcastMessage(message);

            var data = new {time = DateTime.Now, temperature = 0, humidity = 0, moisture = 0, precipitation = 0, bin_id=1000, notification_type=0};
            var sensorData = JsonConvert.DeserializeAnonymousType(message, data); 
           
            string notificationBody = "";

            switch (sensorData.notification_type)
            {
                case 0:
                    notificationBody = "Data sent successfully";
                    break;

                case 1 :
                    notificationBody = "Warning: incoming storm";
                    break; 

                case 2 :
                    notificationBody = "Error: Data malformed!";
                    break;

                default:
                    notificationBody = "Unknown Error";
                    break;
            }


            //
            SensorReading.Post(
                DateTime.Now,
                sensorData.temperature,
                sensorData.humidity,
                sensorData.moisture,
                sensorData.precipitation,
                sensorData.bin_id,
                notificationBody,
                (byte)sensorData.notification_type);

            
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