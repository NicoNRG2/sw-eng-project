const Reservation = require('../models/reservation');
const ShoppingCart = require('../models/shoppingCart');

// Function to fetch all the reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('customerName').populate('shoppingCart');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a single reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('customerName').populate('shoppingCart');
    if (reservation == null) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new reservation based on an existing shopping cart
const createReservation = async (req, res) => {
  const { pickupTime, customerName, shoppingCartId } = req.body;

  try {
    const shoppingCart = await ShoppingCart.getCartById(shoppingCartId);
    if (!shoppingCart) {
      return res.status(400).json({ message: 'Shopping cart not found' });
    }

    const totalCost = shoppingCart.totalCost;

    const reservation = new Reservation({
      pickupTime,
      customerName,
      status: 'pending',
      quantities: shoppingCart.quantities,
      products: shoppingCart.products,
      totalCost: shoppingCart.totalCost
    });

    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update reservation status
const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation == null) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    if (req.body.status != null) {
      reservation.status = req.body.status;
    }

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation == null) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.remove();
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};
