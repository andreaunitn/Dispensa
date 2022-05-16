const mongoose = require('mongoose')

const Ricetta = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, 'Titolo is required']
  },
  descrizione: {
    type: String,
    required: [true, 'descrizione is required']
  },
  ingredienti: {
    type: Ingrediente,
    required: [true, 'ingredienti are required']
  },
  numero_persone: {
    type: int,
    required: [true, 'numero di persone is required']
  },
  energia: {
    type: int,
    required: [true, 'energia is required']
  }
})

module.exports = schema
