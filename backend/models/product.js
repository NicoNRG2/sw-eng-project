const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  ingredients: [String],
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: Number,
    default: 0
  },
  images: [String],
  vegan: {
    type: Boolean,
    default: false
  },
  gluten_free: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;