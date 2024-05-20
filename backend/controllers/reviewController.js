const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');

// Function to get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('product', 'name').populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('product', 'name').populate('user', 'name');
    if (review == null) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get the average rating of a product
const getProductRatingAverage = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    res.json({ productId, averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a review
const createReview = async (req, res) => {
  const { rating, comment, product, user } = req.body;

  try {
    const productExists = await Product.findById(product);
    const userExists = await User.findById(user);
    if (!productExists || !userExists) {
      return res.status(400).json({ message: 'Invalid product or user ID' });
    }

    const review = new Review({
      rating,
      comment,
      product,
      user
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update a review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (req.body.rating != null) {
      review.rating = req.body.rating;
    }
    if (req.body.comment != null) {
      review.comment = req.body.comment;
    }

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getProductRatingAverage,
  createReview,
  updateReview,
  deleteReview
};
