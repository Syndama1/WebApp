const express = require('express');
const ejs = require('ejs');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

var numPresses = 0;

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get(['/', '/home'], (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    io.emit('numpresses', numPresses);
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('press', () => {
        numPresses ++;
        console.log('Pressed');
        io.emit('numpresses', numPresses);
    });
});

server.listen(443, () => {
    console.log("We're live on http://localhost:443");
});