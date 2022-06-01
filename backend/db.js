const mongoose = require('mongoose');

const options =
  {
    user: "admin",
    pass: "admin"
  };

//da cambiare con variabili d'ambiente
//mongoose.connect("mongodb+srv://db.jlapy.mongodb.net/db", options);

module.exports = {mongoose}
