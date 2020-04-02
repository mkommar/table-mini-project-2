var express = require('express');
var path = require('path');

var reservedTables = [];
var waitTables = [];

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get('/api/tables', function(req, res) {
    res.json(reservedTables);
})

app.get('/api/waitlist', function(req, res) {
    res.json(waitTables);
})

app.post('/api/tables', function(req, res) {
    if(reservedTables.length < 5) {
        reservedTables.push(req.body);
        res.json({success: true});
    } else {
        waitTables.push(req.body);
        res.json({success: true});
    }
})

app.listen(PORT, function() {
    console.log("Listening on port " + PORT);
})