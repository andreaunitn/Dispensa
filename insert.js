const mongoose = require('mongoose')

//const Ricetta = require('/Users/paoloaliprandi/Desktop/University of Trento/Terzo Anno/secondo semestre/Ingegneria del Software 2/repository/Dispensa/ricetta.js')
//const Ingrediente = require('/Users/paoloaliprandi/Desktop/University of Trento/Terzo Anno/secondo semestre/Ingegneria del Software 2/repository/Dispensa/ingrediente.js')

const IngredienteSchema = new mongoose.Schema({
    titolo: {
      type: String,
      required: [true, 'Titolo di ingrediente is required']
    }
  });
   
const Ingrediente = mongoose.model('Ingrediente', IngredienteSchema);

const RicettaSchema = new mongoose.Schema({
    titolo: {
      type: String,
      required: [true, 'Titolo is required']
    },
    descrizione: {
      type: String,
      required: [true, 'descrizione is required']
    },
    ingredienti: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'ingredienti are required'],
      ref: 'Ingrediente'
    },
    numero_persone: {
      type: Number,
      required: [true, 'numero di persone is required']
    },
    energia: {
      type: Number,
      required: [true, 'energia is required']
    }
  });
  
const Ricetta = mongoose.model('Ricetta', RicettaSchema);

const pane = new Ingrediente({
    titolo: 'pane'
});

mongoose.connect('mongodb+srv://admin:admin@db.jlapy.mongodb.net/db')

const r = new Ricetta({ 
    titolo: 'pane', 
    descrizione: 'questa ricetta è il pane... con pane! E basta.',
    ingredienti: pane,
    numero_persone: 4,
    energia: 300
 });

r.save().then(() => {
  console.log('ding')
  mongoose.connection.close()
});
