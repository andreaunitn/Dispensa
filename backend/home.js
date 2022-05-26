var express = require('express');
var http = require('http');
const mongoose = require('mongoose');
const {Ricetta} = require('./schemas.js')
const {tokenChecker} = require('./tokenChecker.js')
require('dotenv').config()

const options =
  {
    user: "admin",
    pass: "admin"
  };


var port = 3000;
var app = express();
const router = express.Router()
const path = require('path')

app.use(express.json());
app.use(express.urlencoded());

// Handling GET requests
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/home.html'));
})

app.get('/acquisti', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/acquisti.html'));
})

app.get('/dispensa', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/dispensa.html'));
})

app.get('/aggiungi_ricette', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/aggiungi_ricette.html'));
})


const ricette = require('./ricette.js')
app.use('/api/v1/ricette', ricette)

const authentication = require('./authentication.js')
app.use('/api/v1/authentication', authentication)

//app.use(tokenChecker)

/* Default 404 handler*/
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

app.listen(port, function() {
  console.log('Server running on port:', port);
})

module.exports = router;
