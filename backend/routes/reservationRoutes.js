const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationController');

router.get('/', reservationsController.getAllReservations);
router.get('/user/:userId', reservationsController.getReservationsByUser);
router.post('', reservationsController.createReservation);
router.put('/:id', reservationsController.updateReservation);
router.delete('/:id', reservationsController.deleteReservation);

module.exports = router;
