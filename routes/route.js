let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    port        = 3000;

let Crud        = require("../models/model");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//=====================================================
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

//========================================================
// New Routes - shows new form for new data entry
app.get("/new", (req, res) => {
    res.render("new");
});

//=========================================================
// Create Routes - create a new data list
app.post("/", (req, res) => {
    // retrive data from the form
    let newName = req.body.name;
    let newImg = req.body.img;

    let newInfo = {
        name: newName,
        image: newImg
    };

    // create new data & save into the database
    Crud.create(newInfo, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else{
            // redirect to home page
            res.redirect("/");
        }
    });
});


//===========================================================
// listening for
app.listen(port, () => {
    console.log("Server Starting...");
});