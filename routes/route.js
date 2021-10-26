let express     = require("express"),
    app         = express(),
    port        = 3000;

let Crud        = require("../models/model");
app.set("view engine", "ejs");

// Index Routes - display all data from the database.
app.get("/", (req, res) => {
    Crud.find({}, (err, allData) => {
        if(err){
            console.log(err);
        } else{
            res.render("index", {info: allData});
        }
    });
});

// listening for
app.listen(port, () => {
    console.log("Server Starting...");
});