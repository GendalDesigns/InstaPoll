const mongoose = require("mongoose");

//command we run to actually talk to our database, and where we create our database.
mongoose.connect("mongodb://localhost/InstaPoll", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("database connection successful!"))
    .catch(err=>console.log("database connection failed", err))
