const mongoose = require('mongoose')

const ImageModel = new mongoose.Schema({
    imageId : {
        type: String,
        required: true
    },
    images : {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Image', ImageModel)