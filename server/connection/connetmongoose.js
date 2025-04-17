var mongoose = require("mongoose");
var userSchme = new mongoose.Schema({
  name: {
    type: String,
    // default: "kaka",
    required:true
  },
  email: {
    type: String,
    default: "kaka@gmail.com",
    required: true,
  },
  phno: Number,
});

var userModel=mongoose.model("user",userSchme)

module.exports = userModel