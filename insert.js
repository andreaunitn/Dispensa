const mongoose = require('mongoose')

//const Ricetta = require('/Users/paoloaliprandi/Desktop/University of Trento/Terzo Anno/secondo semestre/Ingegneria del Software 2/repository/Dispensa/ricetta.js')
//const Ingrediente = require('/Users/paoloaliprandi/Desktop/University of Trento/Terzo Anno/secondo semestre/Ingegneria del Software 2/repository/Dispensa/ingrediente.js')

/*
const IngredienteSchema = new mongoose.Schema({
    titolo: {
      type: String,
      required: [true, 'Titolo di ingrediente is required']
    }
  });

const Ingrediente = mongoose.model('Ingrediente', IngredienteSchema);
*/

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
      required: [true, 'ingredienti are required'],
      //ref: 'Ingrediente'
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

const Ricetta = mongoose.model('Ricetta', RicettaSchema);

/*
const pane = [
  new Ingrediente({titolo: 'farina'}),
  new Ingrediente({titolo: 'acqua'}),
  new Ingrediente({ titolo: 'lievito' }),
  new Ingrediente({ titolo: 'sale' })
]


const ingrediente = new Ingrediente({titolo: 'farina'})
*/

const ingredienti = ["patate", "farina", "uova", "latte", "semola","sale"]

mongoose.connect('mongodb+srv://admin:admin@db.jlapy.mongodb.net/db')

const r = new Ricetta({
    titolo: 'gnocchi di patate',
    descrizione: 'nonna letizia ci dice come fare gli gnocchi.NOVITà! gnocchi di PATATE! POTATO! POMME DE TERRE!',
    ingredienti: ingredienti,
    numero_persone: 4,
    energia: 450
 });

r.save().then(() => {
  console.log('query executed: '+r.titolo)
  mongoose.connection.close()
});
