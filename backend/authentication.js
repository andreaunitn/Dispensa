const express = require('express');
const {mongoose} = require('./db.js')
const {User} = require('./schemas.js')
const router = express.Router()
const jwt = require('jsonwebtoken')
//require('dotenv').config()

router.post('', async function(req, res) {

  let user = await User.findOne({ email: req.body.email }).exec()

  if (!user)
    res.json({success:false,message:'User not found'})
  if (user.password!=req.body.password)
    res.json({success:false,message:'Wrong password'})

  // user authenticated -> create a token
  var payload = { email: user.email, id: user._id }
  var options = { expiresIn: 86400 } // expires in 24 hours
  var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
  res.json({ success: true, message: 'Enjoy your token!',
       token: token, email: user.email, id: user._id, self: "api/v1/" + user._id
  });
});

router.get('/newUser', async function(req, res) {
  const u = new User({
    nome: 'Marco',
    email: 'marco.ronchetti@unitn.it',
    password: 'webengine'
  })

  u.save().then(() => {
    console.log('user registered: ' + u.nome)
    mongoose.connection.close()
    res.json({ result: "success" })
  });
})

module.exports = router;
