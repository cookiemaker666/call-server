const WebSocket = require('ws');

const server = require('http').createServer();
const wss = new WebSocket.Server({ server });

let clients = {};

wss.on('connection', ws => {

  ws.on('message', msg => {
    let data = JSON.parse(msg);

    if (data.type === "join") {
      clients[data.id] = ws;
      ws.id = data.id;
      return;
    }

    if (data.to && clients[data.to]) {
      clients[data.to].send(JSON.stringify({
        ...data,
        from: ws.id
      }));
    }
  });

  ws.on('close', () => {
    if (ws.id) delete clients[ws.id];
  });

});

server.listen(process.env.PORT || 3000);