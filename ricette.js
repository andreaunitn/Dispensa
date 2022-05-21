const express = require('express');
const {mongoose} = require('./db.js')
const {Ricetta} = require('./schemas.js')
const router = express.Router()

// Handling GET requests
router.get('', async function(req, res) {

  let param = req.query

  if(param.ingredienti == null && param.titolo == null) {

    var ricette = await Ricetta.find({}).select('-__v')

  } else if(param.ingredienti != null) {

    var ingr = JSON.parse(param.ingredienti)
    var ricette = await Ricetta.find({ingredienti: {$not:{$elemMatch:{$nin:ingr.ingredienti}}}}).select('-__v')

  } else if(param.titolo != null) {

      var ricette = await Ricetta.find({titolo: { $regex: param.titolo, $options: 'i' }}).select('-__v')
  }

  var results = {
    "length" : ricette.length,
    "ricette" : ricette
  }

  res.status(200).json(results)
})

// Handling GET requests -- ID TEST 62825e34dbe7884c20752951 --
router.get('/:id', async function(req, res) {

  try {
    var ricetta = await Ricetta.findById(req.params.id).select('-__v')
  } catch (err) {
    res.status(400).json({ error: 'Recipe does not exist' });
    return;
  }

  res.status(200).json(ricetta)
})

module.exports = router;