const mongoose = require('mongoose');

const options =
  {
    user: "admin",
    pass: "admin"
  };

mongoose.connect("mongodb+srv://db.jlapy.mongodb.net/db", options);

module.exports = {mongoose}
