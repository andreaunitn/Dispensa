const mongoose = require('mongoose')
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

const ingredienti = ["patate", "farina", "uova", "latte", "semola","sale"]
mongoose.connect(process.env.DB_URL)

const r = new Ricetta({
    titolo: 'gnocchi di patate',
    descrizione: 'nonna letizia ci dice come fare gli gnocchi.NOVITà! gnocchi di PATATE! POTATO! POMME DE TERRE!',
    ingredienti: ingredienti,
    numero_persone: 4,
    energia: 450
 });

r.save().then(() => {
  mongoose.connection.close()
});
