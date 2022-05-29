const express = require('express');
const {mongoose} = require('./db.js')
const router = express.Router()

router.get('', async function(req, res) {

  let param = req.query

  if(param.length != 0) {
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
