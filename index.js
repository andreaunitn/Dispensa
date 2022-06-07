const app = require("./backend/home.js");
const mongoose = require("mongoose");

const port = process.env.PORT
const db_url = process.env.DB_URL

mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {
    app.listen(port, function() {
        console.log('Server running on port:', port);
    });

})
.catch((err)=>{
    console.error(err)
});
