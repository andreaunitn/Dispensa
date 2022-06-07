const mongoose = require('mongoose')
const {Ingredienti} = require('./schemas.js')
const ingredienti = ["farina","latte","uova","zucchero","sale","olio","lievito","pomodoro","mozzarella","acqua","panna","conservanti","limone","mele","pere","banane","fragole","prosciutto cotto","prosciutto crudo","bastoncini","piselli","ceci","tonno","pane","petto di pollo","pan grattato","olio per friggere","pasta per lasagne","ragu","besciamella","grana","burro"]

mongoose.connect(process.env.DB_URL)

const ingrs = new Ingredienti({
    ingredienti: ingredienti
 });

ingrs.save().then(() => {
  mongoose.connection.close()
});
