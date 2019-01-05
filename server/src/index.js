import express from 'express';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';

import Piece from './models/Piece';

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
          type: 'server/sendPiece',
          data: new Piece()
        });
        break;
      default:
    }
  });
});

server.listen(8080, () => console.log('Running on localhost:8080'));
