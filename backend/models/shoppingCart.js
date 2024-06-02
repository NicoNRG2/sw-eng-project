const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  totalPrice: {
    type: Number,
    default: 0
  }
});

// Calculate total price before saving
shoppingCartSchema.pre('save', async function(next) {
  try {
    const cart = this;
    let total = 0;
    for (const item of cart.items) {
      const product = await mongoose.model('Product').findById(item.productId);
      total += product.price * item.quantity;
    }
    cart.totalPrice = total;
    next();
  } catch (error) {
    next(error);
  }
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;