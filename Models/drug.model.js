const mongoose = require('mongoose')
const Schema = mongoose.Schema

const drugSchema = new Schema({
    name: String,
    price: Number,
    activeIngredient: String,
    category: String,
})

const Drug = mongoose.model('Drug', drugSchema)

module.exports = Drug
