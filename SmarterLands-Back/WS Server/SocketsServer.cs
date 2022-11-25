using System.Diagnostics;
using System.Net.WebSockets;

// ECHOSERVER IMPLEMENTATION 

// An EchoServer is an application that allows a client and
// a server to connect so a client can send a message to the server
// and the server can receive the message and send, or echo,
// it back to the client

namespace websocket_server.ServerFunctions
{
    public class SocketsServer 
    {
        public static async Task Echo(WebSocket websocket)
        {
            // A buffer is a storage in physical memory used to temporarily store data while it is being
            // transferred from one place to another
            var buffer = new byte[4096];

            // -- ArraySegment
            // Delimits a section of a one-dimensional array

            // ArraySegment<Type>(collection, startIndex, endIndex)
            var receiveResult = await websocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None
            );


            // When accepting the WebSocket connection before beginning the loop, the middleware pipeline ends.
            // Upon closing the socket, the pipeline unwinds. That is, the request stops moving forward in the
            // pipeline when the WebSocket is accepted.When the loop is finished and the socket is closed, the
            // request proceeds back up the pipeline
            while (websocket.State == WebSocketState.Open)
            {
                // Send Data over the websocket connection asynchronously
                await websocket.SendAsync(
                    new ArraySegment<byte>(buffer, 0, receiveResult.Count),
                    receiveResult.MessageType,
                    receiveResult.EndOfMessage,
                    CancellationToken.None
                );

                // Retrieves data over the websocket asynchronously
                receiveResult = await websocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None
                );

            }

            await websocket.CloseAsync(
                receiveResult.CloseStatus.Value, // Close status value. IE: 1000
                receiveResult.CloseStatusDescription, //Close status description. IE: Connection closed by client
                CancellationToken.None
            );
        }
    }
}
