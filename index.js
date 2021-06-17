const express = require('express');
const ejs = require('ejs');
const http = require('http');
const https = require('https');
const { Server } = require("socket.io");
const { Certificate } = require('crypto');

const app = express();
const server = http.createServer(app);
const httpsServer = https.createServer(app);
const io = new Server(server);

var numPresses = 0;

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get(['/', '/home'], (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/playlists', (req, res) => {
    res.render('playlists');
});

io.on('connection', (socket) => {
    
});

server.listen(8000, () => {
    console.log("We're live on http://localhost:8000");
});

/* Gotta wait til I get a SSL key and Certificate.
httpsServer.listen(443, () => {
    console.log("We're live on https://localhost:443");
}); */