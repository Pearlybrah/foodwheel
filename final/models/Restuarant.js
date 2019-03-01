const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RestuarantSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Restuarant = mongoose.model("Restuarant", RestuarantSchema);
