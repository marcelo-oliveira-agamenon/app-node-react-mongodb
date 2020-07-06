const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 250,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    maxlength: 200,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 9,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageKey: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
  },
  roles: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
