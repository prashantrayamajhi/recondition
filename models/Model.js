const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Model = mongoose.model("Model", ModelSchema);

module.exports = Model;
