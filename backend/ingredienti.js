const express = require('express');
const {mongoose} = require('./db.js')
const {Ingredienti} = require('./schemas.js')
const router = express.Router()

router.get('', async function(req, res) {

  if(Object.keys(req.query).length !== 0) {
    res.status(400).json({ error: 'Richiesta malformata' })
    return;
  }

  var ingredienti = await Ingredienti.find({}).select('-__v')

  var results =
  {
    "ingredienti" : ingredienti
  }

  res.status(200).json(results)
})

module.exports = router;
