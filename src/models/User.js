const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    maxlength: 250,
    minlength: [8, "Name must have at least 8 digits"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    maxlength: 200,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must hava at least 6 digits"],
  },
  phone: {
    type: Number,
    required: false,
    minlength: [11, "Phone must have at least 8 digits"],
  },
});

module.exports = mongoose.model("User", userSchema);
