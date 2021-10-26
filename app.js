// initialize packages
let express             = require("express"),
    app                 = express(),
    port                = 3000,
    bodyParser          = require("body-parser"),
    methodOverWrite     = require('method-override');


// ====================================== config =================================
// don't need to use .ejs extention
app.set("view engine", "ejs");
// tell express to serve the content of the public directory
app.use(express.static("public"));
// retrive data from the body
app.use(bodyParser.urlencoded({extended: true}));
// method override
app.use(methodOverWrite("_method"));


// ===================================== mongo DB config ==========================
 let mongoose           = require("mongoose");
 mongoose.connect("mongodb://localhost/crud_app");  // connect to the db & create crud_app. if exists then it'll use it. otherwise created automatically.


 // ==================================== Schema Model ==============================
 // define a Schema 
let Schema      = mongoose.Schema;
let ObjectId    = Schema.ObjectId;

// define crud schema
let crudSchema  = new Schema({
    name: String,
    image: String,
    description: String
});

// compile that schema into the model
let Crud    = mongoose.model("Crud", crudSchema);   // creating a cruds collections into the database
// tell node.js exports file to another place
// module.exports = Crud;


 // ==================================== required files ==========================
//  let Crud   = require("./models/model");
//  let Routes = require("./routes/route");


 // ====================================== Routes ===================================
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
    let newDesc = req.body.desc;

    let newInfo = {
        name: newName,
        image: newImg,
        description: newDesc
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

//================================================================
// Show Routes - show one specific items
app.get("/:id", (req, res) => {
    // find the info with provided id
    Crud.findById(req.params.id, (err, foundInfo) => {
        if(err){
            console.log(err);
        } else{
            // render show template with that _id
            res.render("show", {data: foundInfo});
        }
    });
});

//================================================================
// listening for
app.listen(port, () => {
    console.log("Server Starting...");
});
