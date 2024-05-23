const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to get all reviews
router.get('/', reviewController.getAllReviews);

// Route to get a review by ID
router.get('/:id', reviewController.getReviewById);

// Route to get reviews by product ID
router.get('/product/:productId', reviewController.getReviewsByProductId);  // New route

// Route to get the average rating of a product
router.get('/average/:productId', reviewController.getProductRatingAverage);

// Route to create a new review
router.post('/', reviewController.createReview);

// Route to update an existing review
router.put('/:id', reviewController.updateReview);

// Route to delete a review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
