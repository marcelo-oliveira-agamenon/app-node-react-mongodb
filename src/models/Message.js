const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
  toUser: {
    type: String,
    required: true,
  },
  fromUser: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
