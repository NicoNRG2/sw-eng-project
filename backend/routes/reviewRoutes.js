const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Reviews management
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve a list of reviews
 *     tags: [Reviews]
 *     description: Retrieve a list of reviews from the database.
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', reviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Retrieve a single review by ID
 *     tags: [Reviews]
 *     description: Retrieve a review by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: A single review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get('/:id', reviewController.getReviewById);

/**
 * @swagger
 * /reviews/product/{productId}:
 *   get:
 *     summary: Retrieve reviews by product ID
 *     tags: [Reviews]
 *     description: Retrieve reviews by the product ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A list of reviews for the specified product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for this product
 */
router.get('/product/:productId', reviewController.getReviewsByProductId);

/**
 * @swagger
 * /reviews/average/{productId}:
 *   get:
 *     summary: Get the average rating of a product
 *     tags: [Reviews]
 *     description: Get the average rating of a product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The average rating of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 averageRating:
 *                   type: number
 *                 totalReviews:
 *                   type: number
 *       404:
 *         description: No reviews found for this product
 */
router.get('/average/:productId', reviewController.getProductRatingAverage);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     description: Create a new review in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The created review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request
 */
router.post('/', reviewController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update an existing review
 *     tags: [Reviews]
 *     description: Update an existing review in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: The updated review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     description: Delete a review by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
