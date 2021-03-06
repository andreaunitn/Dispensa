const express = require('express')
const {User} = require('./schemas.js')
const router = express.Router()

router.put('/me', async function(req, res) {

  if(!req.loggedUser) {
    res.status(401).json({success:false,message:'Nessun token fornito'})
    return;
  }

  var ingrString = req.body.ingredienti
  if(typeof(ingrString) != typeof("")) {
    res.status(400).json({success:false, message:'Richiesta malformata'})
    return
  }

  var ingredienti = ingrString.split(',')

  User.findByIdAndUpdate(
    req.loggedUser.id,
    { ingredienti: ingredienti },
    async function(err, docs) {
      if(err) {
        res.status(500).json({success:false,message:'Errore di update: ' + err})
        return
      }
      else {
        let user = await User.findById(req.loggedUser.id).select('-__v').select('-password').exec()
        res.status(200).json(user)
        return
      }
    });
})

router.put('/:id', async function(req, res) {

  if(!req.loggedUser) {
    res.status(401).json({success:false,message:'Nessun token fornito'})
    return
  }

  if(req.loggedUser.id != req.params.id) {
    res.status(401).json({success:false,message:'Token e id non corrispondono'})
    return
  }

  var ingrString = req.body.ingredienti
  if(typeof(ingrString) != typeof("")) {
    res.status(400).json({success:false, message:'Richiesta malformata'})
    return
  }

  var ingredienti = ingrString.split(',')

  User.findByIdAndUpdate(
    req.loggedUser.id,
    { ingredienti: ingredienti },
    async function(err, docs) {
      if(err) {
        res.status(500).json({success:false,message:'Errore di update: ' + err})
        return
      }
      else {
        let user = await User.findById(req.loggedUser.id).select('-__v').select('-password').exec()
        res.status(200).json(user)
        return
      }
    });
})

router.get('/me', async function(req, res) {

  if(!req.loggedUser) {
    res.status(401).json({success:false,message:'Nessun token fornito'})
    return;
  }

  let user = await User.findOne({ email: req.loggedUser.email }).select('-__v').select('-password').exec()

  if (!user) {
    res.json({success:false,message:'Utente non trovato'})
    return
  }

  res.status(200).json(user)

})

router.get('/:id', async function(req, res) {

  if(!req.loggedUser) {
    res.status(401).json({success:false,message:'Nessun token fornito'})
    return;
  }

  if(req.loggedUser.id != req.params.id) {
    res.status(401).json({success:false,message:'Token e id non corrispondono'})
    return;
  }

  let user = await User.findOne({ email: req.loggedUser.email }).select('-__v').select('-password').exec()

  if (!user) {
    res.json({success:false,message:'Utente non trovato'})
    return
  }

  res.status(200).json(user)

})

module.exports = router;