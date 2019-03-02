const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    default: "",
    require: true
  },
  lastName: {
    type: String,
    default: "",
    require: true
  },
  email: {
    type: String,
    default: "",
    require: true
  },
  password: {
    type: String,
    default: "",
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User = mongoose.model("User", UserSchema);