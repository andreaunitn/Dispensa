const mongoose = require('mongoose')

const Ingrediente = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, 'Titolo di ingrediente is required']
  }
})

module.exports = schema
