const WebSocket = require('ws');
const http = require('http');
const { WebSocketServer } = WebSocket;

const server = http.createServer((request, response) =>{
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });
let user=0;
wss.on('connection', function connection(ws) {
    user++;
    console.log(user)
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log("received:"+data)
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.send('Hello! Message From Server!!');
});

server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

