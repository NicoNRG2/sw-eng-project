const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationController');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation management
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Retrieve a list of reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get('/', reservationsController.getAllReservations);

/**
 * @swagger
 * /reservations/user/{userId}:
 *   get:
 *     summary: Get reservations by user
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of reservations for a user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Error retrieving reservations for user
 */
router.get('/user/:userId', reservationsController.getReservationsByUser);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: The created reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Error creating reservation
 */
router.post('/', reservationsController.createReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Update an existing reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: The updated reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error updating reservation
 */
router.put('/:id', reservationsController.updateReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error deleting reservation
 */
router.delete('/:id', reservationsController.deleteReservation);

module.exports = router;
