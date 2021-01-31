const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
