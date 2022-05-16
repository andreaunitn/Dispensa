import mongoose from 'mongoose';
const { Schema } = mongoose;

const IngredienteSchema = new Schema({
  titolo: {
    type: String,
    required: [true, 'Titolo di ingrediente is required']
  }
});
 
const IngredienteModel = mongoose.model('Ingrediente', IngredienteSchema);