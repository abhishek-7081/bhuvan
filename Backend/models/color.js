const mongoose = require('mongoose');

// Define the schema for the Color model
const colorSchema = new mongoose.Schema({
  colors: {
    type: [String], // An array of color strings (e.g., ["#ff0000", "blue"])
    required: true
  }
});

module.exports = mongoose.model('Color', colorSchema);
