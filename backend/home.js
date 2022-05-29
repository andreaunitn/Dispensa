var express = require('express');
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

const ingredienti = require('./ingredienti.js')
app.use('/api/v1/ingredienti', ingredienti)

//API Documentation testing
/*
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'La Dispensa',
      version: '1.0.0',
    },
  },
  apis: ['./*.js'], // files containing annotations as above
};
const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
*/

app.listen(port, function() {
  console.log('Server running on port:', port);
})
