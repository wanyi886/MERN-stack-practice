
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    stock: [{
        price: Number,
        color: String
    }]
})

const Product = mongoose.model("product", productSchema);

module.exports = Product