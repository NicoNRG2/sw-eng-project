const Reservation = require('../models/reservation');
const User = require('../models/user');

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
    const newReservation = new Reservation({ pickupTime, status, userId, items });
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
