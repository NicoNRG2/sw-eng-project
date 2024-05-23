const mongoose = require('mongoose');
const Product = require('./product');

const shoppingCartSchema = new mongoose.Schema({
  quantities: {
    type: Map,
    of: Number,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  totalCost: {
    type: Number,
    default: 0
  }
});

shoppingCartSchema.pre('save', async function(next) {
  const cart = this;
  let totalCost = 0;
  for (const productId of cart.products) {
    const product = await Product.findById(productId);
    totalCost += product.price * cart.quantities.get(productId.toString());
  }
  cart.totalCost = totalCost;
  next();
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;