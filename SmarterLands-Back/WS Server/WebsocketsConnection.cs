using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace websocket_server.Server_Functions
{
    public class WebsocketsConnection
    {
        private ConcurrentDictionary<string, WebSocket> _connections = new ConcurrentDictionary<string, WebSocket>();

        // Get Socket from collection by ID
        public WebSocket getById(string id) => _connections.FirstOrDefault(x => x.Key.Equals(id)).Value;

        //get the socket ID
        public string getID(WebSocket webSocket) => _connections.FirstOrDefault(x => x.Value.Equals(webSocket)).Key;
        
        // Add socket to Concurrent dictionary
        public void addSocket(WebSocket socket) => _connections.TryAdd(Guid.NewGuid().ToString("N"), socket);
        // TODO: What does the Format N does? 

        // Remove a Socket from current collection
        // TODO: What does ApplicationLifeTime does? 
        public async Task removeSocketAsync(string id, Microsoft.Extensions.Hosting.IHostApplicationLifetime applicationLifetime)
        {
            // remove socket from current collection
            _connections.TryRemove(id, out var socket);
            // Close task
            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Socket connection closed", applicationLifetime.ApplicationStopping);

        }
        // Return the collection of connected clients
        public List<WebSocket> broadcast() => _connections.Values.ToList();
    }
}
