var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
const mongoose = require('mongoose');
const {Ricetta} = require('./schemas.js')

const options =
  {
    user: "admin",
    pass: "admin"
  };


var port = 3000;
var app = express();
const path = require('path')

// Handling GET requests
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/home.html'));
})

app.get('/acquisti', function(req, res){
  res.sendFile(path.join(__dirname + '/acquisti.html'));
})

app.get('/dispensa', function(req, res){
  res.sendFile(path.join(__dirname + '/dispensa.html'));
})

const ricette = require('./ricette.js')
app.use('/api/v1/ricette', ricette)

app.listen(port, function() {
  console.log('Server running on port:', port);
})