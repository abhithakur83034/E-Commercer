const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:"String",
    price:"String",
    product:"String",
    brand:"String",
    userId:"String"
})

module.exports = mongoose.model('products',productSchema)