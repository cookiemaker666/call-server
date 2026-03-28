const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (msg) => {
    console.log('Received:', msg.toString());

    // отправка всем
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.send(JSON.stringify({ type: "connected" }));
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
