import express from 'express';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', socket => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on('action', action => {
    switch (action.type) {
      case 'server/getPiece':
        console.log('Got getPiece !');
        socket.emit('action', {
          type: 'getPiece',
          data: {
            form: {
              0: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
              1: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
              2: [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
              3: [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
            },
            rotation: 0,
            pos: [0, 2]
          }
        });
        break;
      default:
    }
  });
});

server.listen(8080, () => console.log('Running on localhost:8080'));
