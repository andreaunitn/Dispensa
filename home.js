var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
const mongoose = require('mongoose');
//const {Ingrediente, Ricetta} = require('./schemas.js');
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

app.get('/cercaRicette', async function(req, res){

  mongoose.connect("mongodb+srv://db.jlapy.mongodb.net/db", options);

  const ingr = JSON.parse(req.query.ingredienti);
  console.log("INGREDIENTS: " + ingr.ingredienti)

  //insert query here
  //const id_ingredienti = await Ingrediente.findOne({titolo: ingr.ingredienti[0]})
  //console.log(id_ingredienti.titolo)
  let results = await Ricetta.find({ingredienti: { $in: ingr.ingredienti[0]}});
  console.log("RESULTS: " + results);

  res.json(ingr);
});

app.listen(port, function() {
  console.log('Server running on port ', port);
})
