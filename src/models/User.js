const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 250,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        maxlength: 200
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        minlength: 11
    }
})

module.exports = mongoose.model("User", userSchema);