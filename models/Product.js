const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    option: {
        type: String,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
    },
    km: {
        type: String,
        trim: true,
        required: true,
    },
    images: {
        type: Array,
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
