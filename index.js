const express = require('express');
const ejs = require('ejs');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const { Server } = require("socket.io");
const { Certificate } = require('crypto');

const app = express();
const server = http.createServer(app);
const httpsServer = https.createServer(app);
const io = new Server(server);

var numPresses = 0;

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/gallery')]);
app.use(express.static(__dirname));

app.get(['/', '/home'], (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/gallery', (req, res) => {
    res.render('gallery');
});

app.get('/gallery/view', (req, res) => {
    var range = req.get("range");
    if (!range) { range = `bytes 0-`; }

    const videoPath = 'views/gallery/videos/feel.mp4';
    const videoSize = fs.statSync(videoPath).size;
    
    const CHUNK_SIZE = 1; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4,"
    }

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
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