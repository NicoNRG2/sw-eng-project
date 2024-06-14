const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  pickupTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'pending', 'completed'],
    default: 'pending'
  },
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
reservationSchema.pre('save', async function(next) {
  try {
    const reservation = this;
    let total = 0;
    for (const item of reservation.items) {
      const product = await mongoose.model('Product').findById(item.productId);
      total += product.price * item.quantity;
    }
    reservation.totalPrice = total;
    next();
  } catch (error) {
    next(error);
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
