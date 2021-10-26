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

 // ==================================== required files ==========================
 let Crud   = require("./models/model");
 let Routes = require("./routes/route");
