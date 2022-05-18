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
var count = 0

// Handling GET requests
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/home.html'));
})

const ricette = require('./ricette.js')
app.use('/api/v1/ricette', ricette)

/*
app.get('/cercaRicette', async function(req, res){

  mongoose.connect("mongodb+srv://db.jlapy.mongodb.net/db", options);

  const ingr = JSON.parse(req.query.ingredienti);
  console.log("INGREDIENTS: " + ingr.ingredienti)

  //insert query here
  //const id_ingredienti = await Ingrediente.findOne({titolo: ingr.ingredienti[0]})
  //console.log(id_ingredienti.titolo)

  //let results = await Ricetta.find({ingredienti: { $in: ingr.ingredienti[0]}});
  //db.things.find({ words: { $all: ["text", "here"] }});
  let results = await Ricetta.find({ingredienti: { $all: ingr.ingredienti}});

  if (results=='') {
    console.log("mmm.... niente");
    temp='"Nessuna ricetta trovata"'
  } else {
    console.log("RESULTS: " + results);

    var temp='';

    for (var i=0; i<results.length; i++) {
      temp=temp+'"'+results[i].titolo+'",'
    }

    temp = temp.replace(/,\s*$/, "");

  }



  json_ricette = '{ "ricette": ['+temp+'], "length": '+results.length+' }'

  console.log(json_ricette)

  res.json(json_ricette);
});
*/

app.listen(port, function() {
  console.log('Server running on port:', port);
})
