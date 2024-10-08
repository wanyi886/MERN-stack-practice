const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true }
})

// mongoose will create a collection named "Users" contains single user
const User = mongoose.model("user", userSchema);

module.exports = User;