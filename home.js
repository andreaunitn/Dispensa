var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
const mongoose = require('mongoose');

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

app.get('/cercaRicette', function(req, res){

  mongoose.connect("mongodb+srv://db.jlapy.mongodb.net/db", options);

  res.json({ricette: ['Pane', 'Acqua', 'Cipolle']});
});

app.listen(port, function() {
  console.log('Server running on port ', 3000);
})
