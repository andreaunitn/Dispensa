const app = require("./backend/home.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL//  process.env.DB_URL;

async mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {

    console.log("Database connection successful");

    app.listen(port, function() {
        console.log('Server running on port:', port);
    });

})
.catch((err)=>{
    console.error("error: db connection");
    console.error(err)
});
