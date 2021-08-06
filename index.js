const express = require('express');
const ejs = require('ejs');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const { Server } = require("socket.io");
const { Certificate } = require('crypto');

const sqlConfig = require('./sqlConfig.json')

const app = express();
const server = http.createServer(app);
const httpsServer = https.createServer(app);
const connection = mysql.createConnection({
    host: sqlConfig.host,
    user: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.database
});

const io = new Server(server);

// Code for programming building a video library, using SQL, but needs to be fixed with proper video reference indexing. Also want to move to it's own module.

// const insertVideoSQL = function(videoName, videoType, videoPath) {
//     const sql = 'INSERT INTO videos (videoName, videoType, videoPath) VALUES ("' + videoName + '", "' + videoType + '", "' + videoPath + '")';
//     return sql;
// };

// const getAllVideoFiles = function(dirPath, arrayOfFiles) {
//     files = fs.readdirSync(dirPath);
  
//     arrayOfFiles = arrayOfFiles || [];
  
//     files.forEach(function(file) {
//         if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//             arrayOfFiles = getAllVideoFiles(dirPath + "/" + file, arrayOfFiles);
//         } else {
//             fileName = file;
//             fileType = path.extname(file).replace('.', '');
//             switch (path.extname(file)) {
//                 case '.mp4':
//                     arrayOfFiles.push({name: fileName, type: fileType, path: dirPath});
//             }
//         }
//     });
  
//     return arrayOfFiles;
// };

// videoList = getAllVideoFiles(sqlConfig['content-library']);

// const pushToSQL = function(array) {
//     array.forEach(element => {
//         connection.query(insertVideoSQL(element.name, element.type, element.path), (err) => {
//             if (err) {
//                 if (err.errno == 1062) null;
//             }
//         });
//     });
// };


// connection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected to SQL Database!");

//     pushToSQL(videoList);
    
// });

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/gallery')]);
app.use(express.static(__dirname));

app.get(['/', '/home'], (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});


// Code for programming building a video library, using SQL, but needs to be fixed with proper video reference indexing. Also want to move to it's own module.

// app.get('/gallery', (req, res) => {
//     res.render('gallery');
// });

// app.get('/gallery/view', (req, res) => {
//     videoID = req.query.q;
//     if (!videoID) {
//         res.redirect('/gallery');
//         throw null;
//     };

//     connection.query("SELECT * FROM videos WHERE id = " + req.query.q, (err, result) => {
//         if (err) {
//             res.redirect('/gallery');
//             throw err;
//         };

//         const videoPath = result[0].videoPath + '/' + result[0].videoName;
//         const videoType = result[0].videoType;
        
//         var range = req.get("range");
//         if (!range) { range = `bytes 0-`; }

        
//         const videoSize = fs.statSync(videoPath).size;
        
//         const CHUNK_SIZE = (10 ** 6) * 8; // 8MB
//         const start = Number(range.replace(/\D/g, ""));
//         const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//         const contentLength = end - start + 1;
//         const headers = {
//             "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//             "Accept-Ranges": "bytes",
//             "Content-Length": contentLength,
//             "Content-Type": "video/" + videoType
//         };

//         res.writeHead(206, headers);

//         const videoStream = fs.createReadStream(videoPath, { start, end });

//         videoStream.pipe(res);
//     });

// });

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