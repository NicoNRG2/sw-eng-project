const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  pickupTime: {
    type: Date,
    required: true
  },
  customerName: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'pending'
  },
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
    required: true
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
