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

//Set port for Heroku
let port = process.env.port || 3000

var app = express();
const router = express.Router()
const path = require('path')

app.use(express.json());
app.use(express.urlencoded());

// Handling GET requests
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/home.html'));
})

app.get('/header.html', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/header.html'));
})

app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/login.html'));
})

app.get('/register', function(req, res){
  res.sendFile(path.join(__dirname, '..', '/frontend/register.html'));
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


app.use('/api/v1/users', tokenChecker);

const users = require('./users.js')
app.use('/api/v1/users', users)

const ricette = require('./ricette.js')
app.use('/api/v1/ricette', ricette)

const authentication = require('./authentication.js')
app.use('/api/v1/authentication', authentication)

const ingredienti = require('./ingredienti.js')
app.use('/api/v1/ingredients', ingredienti)

/* Default 404 handler*/
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

app.listen(port, function() {
  console.log('Server running on port:', port);
})

module.exports = router;