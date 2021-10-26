let mongoose    = require("mongoose");

// define a Schema 
let Schema      = mongoose.Schema;
let ObjectId    = Schema.ObjectId;

// define crud schema
let crudSchema  = new Schema({
    name: String,
    image: String,
});

// compile that schema into the model
let Crud    = mongoose.model("Crud", crudSchema);   // creating a cruds collections into the database
// tell node.js exports file to another place
module.exports = Crud;