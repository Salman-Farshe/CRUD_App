// initialize packages
let express             = require("express"),
    app                 = express(),
    port                = process.env.PORT || 3000,
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
 // mongoose.connect("mongodb://localhost/crud_app");  // connect to the db & create crud_app. if exists then it'll use it. otherwise created automatically.

 mongoose.connect("mongodb+srv://user1:user1@crudapp.q46n6.mongodb.net/crud_app?retryWrites=true&w=majority");

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

//===============================================================
// Edit Routes - Show edit form for one specific items
app.get("/:id/edit", (req, res) => {
    Crud.findById(req.params.id, (err, foundInfo) => {
        if(err){
            res.redirect("/");
        } else{
            res.render("edit", {editData: foundInfo});
        }
    });
});

//===============================================================
// Update Routes - update that specific items
app.put("/:id", (req, res) => {
    // which _id are looking for, what data want to update
    let newInfo = {
        name: req.body.name,
        image: req.body.img,
        description: req.body.desc
    }

    Crud.findByIdAndUpdate(req.params.id, newInfo, (err, updatedInfo) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/" + req.params.id);
        }
    });
});

//==================================================================
// Destroy Routes - delete that specific items
app.delete("/:id", (req, res) => {
    Crud.findByIdAndRemove(req.params.id, (err, deleteInfo) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/");
        }
    });
});


//================================================================
// listening for
app.listen(port, () => {
    console.log("Server Starting...");
});
