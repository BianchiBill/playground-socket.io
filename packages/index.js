/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(`message: ${msg}`);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.broadcast.emit('hi');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
