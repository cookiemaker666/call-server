const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function message(data) {
    console.log('Received:', data);

    // отправка всем
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.send(JSON.stringify({ type: "connected" }));
});
