const express = require('express');
const {mongoose} = require('./db.js')
const {Ricetta} = require('./schemas.js')
const router = express.Router()

/**
* @openapi
*   /api/v1/ricette:
*   get:
*     summary: titolo e ingredienti
*     tags: 
*       - Ricette
*     parameters:
*               - in: query
*                 name: titolo
*                 required: false
*                 schema:
*                   type: string
*                 description: titolo della ricetta
*               - in: query
*                 name: ingredienti
*                 required: false
*                 schema:
*                   type: JSON
*                 description: JSON contenente un array di nome ingredienti con al suo interno stringhe
*
*     description: Utilizzato per ottenere le ricette cercando per nome OPPURE per ingredienti necessari. Entrambi i parametri non possono essere specificati assieme
*     responses:
*       200:
*         description: |
*                      Ritorna un JSON con le ricette in questo formato:
* 
*                          'length': number, 
* 
*                          'ricette': Ricetta
*/

router.get('', async function(req, res) {

  let param = req.query

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

/**
* @openapi
*   /api/v1/ricette/{id}:
*   get: 
*     tags: 
*       - Ricette
*     parameters:
*              - in: path
*                name: id
*                required: false
*                schema: 
*                  type: string
*                description: id della ricetta
*
*     description: Utilizzato per interfacciarsi con le ricette del nostro database 
*     responses:
*       200:
*         description: |
*                      Ritorna un JSON con le ricette in questo formato:
* 
*                          'length': number, 
* 
*                          'ricette': Ricetta
*/

// Handling GET requests -- ID TEST 6283ddbaab0096198ef2c03f --
router.get('/:id', async function(req, res) {

  try
  {
    var ricetta = await Ricetta.findById(req.params.id).select('-__v')
  } catch (err)
  {
    res.status(400).json({ error: 'Recipe does not exist' });
    return;
  }

  res.status(200).json(ricetta)
})

module.exports = router;