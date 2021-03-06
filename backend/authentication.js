const express = require('express')
const {User} = require('./schemas.js')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/login', async function(req, res) {

  for(p in req.body) {
    if(p != "email" && p!= "password") {
      res.status(400).json({success:false,message:'Richiesta malformata'})
      return
    }
  }

  let user = await User.findOne({ email: req.body.email }).exec()

  if(!user) {
    res.status(401).json({success:false,message:'Utente non trovato'})
    return
  } else if (user.password != req.body.password) {
    res.status(401).json({success:false,message:'Password errata'})
    return
  } else {
    // user authenticated -> create a token
    var payload = { email: user.email, id: user._id }
    var options = { expiresIn: 86400 } // expires in 24 hours
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
    res.status(200).json({ success: true, message: 'Loggato correttamente',
        token: token, email: user.email, id: user._id, self: "/api/v1/users/" + user._id})
    return
  }
});

router.post('/register', async function(req, res) {

  if(req.body.nome == null || req.body.nome == "" || req.body.cognome == null || req.body.cognome == "" ||
      req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == "" ) {
        res.status(400).json({success:false, message:'Campi mancanti'});
        return;
      }

  let user = await User.findOne({ email: req.body.email }).exec()

  if (user) {
    res.status(401).json({success:false,message:'Email già utilizzata'})
    return
  }

  if (typeof req.body.email != 'string' || !checkIfEmailInString(req.body.email)) {
        res.status(400).json({success:false, message:'Email non conforme'});
        return;
  }

  const u = new User({
    nome: req.body.nome,
    cognome: req.body.cognome,
    email: req.body.email,
    password: req.body.password
  })

  u.save(async function (err, room) {
    if(err) {

      res.status(500).json({success:false, message:'Errore registrazione utente'})
      return

    } else {
      var payload = { email: room.email, id: room._id }
      var options = { expiresIn: 86400 } // expires in 24 hours
      var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
      res.status(201).json({ success: true, message: 'Registrato correttamente',
           token: token, email: room.email, id: room._id, self: "/api/v1/users/me"
      });
    }
  })

})

function checkIfEmailInString(text) {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

module.exports = router;