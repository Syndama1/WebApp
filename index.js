const express = require('express');
const ejs = require('ejs');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get(['/', '/home'], (req, res) => {
    res.render('index');
});

app.listen(443, () => {
    console.log("We're live on http://localhost:443");
});