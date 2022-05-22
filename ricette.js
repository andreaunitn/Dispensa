const express = require('express');
const {mongoose} = require('./db.js')
const {Ricetta} = require('./schemas.js')
const router = express.Router()

router.get('', async function(req, res) {

  let param = req.query

  for(elem in param) {
    if(elem != 'titolo' && elem != 'ingredienti') {
      res.status(400).json({ error: 'Richiesta malformata' })
      return;
    }
  }

  if (param.ingredienti == null && param.titolo == null) {
    
    var ricette = await Ricetta.find({}).select('-__v')

  } else if(param.ingredienti != null) {

    var ingr = JSON.parse(param.ingredienti)
    var ricette = await Ricetta.find({ingredienti: {$not:{$elemMatch:{$nin:ingr.ingredienti}}}}).select('-__v')

  } else if(param.titolo != null) {

      var ricette = await Ricetta.find({titolo: { $regex: param.titolo, $options: 'i' }}).select('-__v')

  }

  var results =
  {
    "length" : ricette.length,
    "ricette" : ricette
  }

  res.status(200).json(results)
})

// Handling GET requests -- ID TEST 6283ddbaab0096198ef2c03f --
router.get('/:id', async function(req, res) {

  try
  {
    var ricetta = await Ricetta.findById(req.params.id).select('-__v')
  } catch (err)
  {
    res.status(404).json({ error: 'Ricetta non esiste' });
    return;
  }

  res.status(200).json(ricetta)
})

module.exports = router;