var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var port = 3000;
var app = express();
const path = require('path')

// Handling GET requests
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/home.html')); 
})

app.get('/cercaRicette', function(req, res){
  res.json({json: 'response'});
});

app.listen(port, function() {
  console.log('Server running on port ', 3000);
})
