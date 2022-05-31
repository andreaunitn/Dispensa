const express = require('express');
const {mongoose} = require('./db.js')
const {User} = require('./schemas.js')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/me', async function(req, res) {

  if(!req.loggedUser) {
    res.status(401).json({success:false,message:'No token provided.'})
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
    res.status(401).json({success:false,message:'No token provided'})
    return;
  }

  if(req.loggedUser.id != req.params.id) {
    res.status(401).json({success:false,message:'Token and id not corresponding'})
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
