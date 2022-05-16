import mongoose from 'mongoose';
const { Schema } = mongoose;

const RicettaSchema = new Schema({
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
});

const RicettaModel = mongoose.model('Ricetta', RicettaSchema);
