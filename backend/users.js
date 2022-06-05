const express = require('express');
const {mongoose} = require('./db.js')
const {User} = require('./schemas.js')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.put('/me', async function(req, res) {

  if(!req.loggedUser) {
    res.status(401).json({success:false,message:'Nessun token fornito'})
    return;
  }

  var ingrString = req.body.ingredienti
  console.log(ingrString)
  //ingrString = ingrString.replace(/\s/g, '')
  //ingrString = ingrString.substring(1);
  //ingrString = ingrString.slice(0, -1);
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
        console.log(docs)
        return
      }
    });
})

router.put('/:id', async function(req, res) {

  if(!req.loggedUser) {
    res.status(401).json({success:false,message:'Nessun token fornito'})
    return;
  }

  if(req.loggedUser.id != req.params.id) {
    res.status(401).json({success:false,message:'Token e id non corrispondono'})
    return;
  }

  var ingrString = req.body.ingredienti
  console.log(ingrString)
  //ingrString = ingrString.replace(/\s/g, '')
  //ingrString = ingrString.substring(1);
  //ingrString = ingrString.slice(0, -1);
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
        console.log(docs)
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
