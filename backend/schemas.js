const mongoose = require('mongoose');
const RicettaSchema = new mongoose.Schema({
    titolo: {
      type: String,
      required: [true, 'Titolo is required']
    },
    descrizione: {
      type: String,
      required: [true, 'descrizione is required']
    },
    ingredienti: [{
      type: String,
      required: [true, 'ingredienti are required']
    }],
    numero_persone: {
      type: Number,
      required: [true, 'numero di persone is required']
    },
    energia: {
      type: Number,
      required: [true, 'energia is required']
    }
  });

const UserSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: [true, 'nome is required']
    },
    cognome:{
      type: String,
      required: [true, 'cognome is required']
    },
    email: {
      type: String,
      required: [true, 'email is required']
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    ingredienti: [{
      type: String,
      required: [true, 'ingredienti are required']
    }]
});

const IngredientiSchema = new mongoose.Schema({
    ingredienti: [{
      type: String,
      required: [true, 'ingredienti are required']
    }]
})

const Ricetta = mongoose.model('Ricetta', RicettaSchema);
const User = mongoose.model('User', UserSchema);
const Ingredienti = mongoose.model('Ingredienti', IngredientiSchema)

module.exports = {Ricetta, User, Ingredienti}