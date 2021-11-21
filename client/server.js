const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('/index.html');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));



// var express = require("express");
// var fs = require('fs');
// var sys = require('sys');

// var app = express();
//     app.use(express.logger());
//     app.set("view options", {layout: false});
//     app.use(express.static(__dirname + '/views'));

// app.get('/', function(req, res){
//     res.render('/views/index.html');
// });

// app.listen(8080);
// console.log('Express server started');