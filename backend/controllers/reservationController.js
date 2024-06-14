const Reservation = require('../models/Reservation'); // Assicurati di modificare il percorso se necessario
const User = require('../models/User'); // Assicurati di modificare il percorso se necessario
const Product = require('../models/Product'); // Assicurati di modificare il percorso se necessario

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId').populate('items.productId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reservations', error });
  }
};

// Get reservations by user
const getReservationsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const reservations = await Reservation.find({ userId }).populate('items.productId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reservations for user', error });
  }
};

// Create a new reservation
const createReservation = async (req, res) => {
  const { pickupTime, status, userId, items } = req.body;

  try {
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product with id ${item.productId} not found` });
      }
      totalPrice += product.price * item.quantity;
    }

    const newReservation = new Reservation({ pickupTime, status, userId, items, totalPrice });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

// Update a reservation
const updateReservation = async (req, res) => {
  const reservationId = req.params.id;
  const updates = req.body;

  try {
    let totalPrice = 0;
    if (updates.items) {
      for (const item of updates.items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product with id ${item.productId} not found` });
        }
        totalPrice += product.price * item.quantity;
      }
      updates.totalPrice = totalPrice;
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updates, { new: true }).populate('items.productId');
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation', error });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};

module.exports = {
  getAllReservations,
  getReservationsByUser,
  createReservation,
  updateReservation,
  deleteReservation
};
