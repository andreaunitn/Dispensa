const mongoose = require('mongoose')
const {Ingredienti} = require('./schemas.js')


const ingredienti = ["farina","latte","uova","zucchero","sale","olio","lievito","pomodoro","mozzarella","acqua","panna","conservanti","limone","mele","pere","banane","fragole","prosciutto cotto","prosciutto crudo","bastoncini","piselli","ceci","tonno","pane","petto di pollo","pan grattato","olio per friggere","pasta per lasagne","ragu","besciamella","grana","burro"]

mongoose.connect('mongodb+srv://admin:admin@db.jlapy.mongodb.net/db')

const ingrs = new Ingredienti({
    ingredienti: ingredienti
 });

ingrs.save().then(() => {
  console.log('ingredienti aggiunti: '+ingrs.ingredienti)
  mongoose.connection.close()
});
