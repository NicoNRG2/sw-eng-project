const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationController');

router.get('/reservations', reservationsController.getAllReservations);
router.get('/reservations/user/:userId', reservationsController.getReservationsByUser);
router.post('/reservations', reservationsController.createReservation);
router.put('/reservations/:id', reservationsController.updateReservation);
router.delete('/reservations/:id', reservationsController.deleteReservation);

module.exports = router;
