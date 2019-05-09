const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactNumber: String,
    accountType: String,
}); //id not needed. Mongo auto add.


module.exports = mongoose.model("User", userSchema);
