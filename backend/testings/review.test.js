const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');

jest.mock('../models/review');
jest.mock('../models/product');
jest.mock('../models/user');

describe('Review API', () => {
    let userToken;
  
    beforeAll(() => {
      // Mock JWT token
      userToken = jwt.sign({ userId: 'user123', username: 'testuser' }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('GET /api/reviews', () => {
      it('should return all reviews', async () => {
        Review.find.mockResolvedValue([
          { rating: 5, comment: 'Excellent!', product: 'product123', user: 'user123' },
          { rating: 4, comment: 'Good product!', product: 'product123', user: 'user123' }
        ]);
  
        const res = await request(app).get('/api/reviews');
  
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
      });
    });
  
    describe('POST /api/reviews', () => {
      it('should create a new review', async () => {
        const newReview = {
          rating: 5,
          comment: 'Excellent!',
          product: 'product123',
          user: 'user123'
        };
        Product.findById.mockResolvedValue({ name: 'Product1' });
        User.findById.mockResolvedValue({ name: 'User1' });
        Review.prototype.save = jest.fn().mockResolvedValue(newReview);
  
        const res = await request(app)
          .post('/api/reviews')
          .set('Authorization', `Bearer ${userToken}`)
          .send(newReview);
  
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('comment', 'Excellent!');
      });
    });

    // get single review by id
    describe('GET /api/reviews/:id', () => {
        it('should return a single review', async () => {
          Review.findById.mockResolvedValue({ rating: 5, comment: 'Excellent!', product: 'product123', user: 'user123' });
    
          const res = await request(app).get('/api/reviews/review123');
    
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('comment', 'Excellent!');
        });

        it('should return 404 if review not found', async () => {
            Review.findById.mockResolvedValue(null);
      
            const res = await request(app).get('/api/reviews/review123');
      
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Review not found');
        });
    });
  
    describe('PUT /api/reviews/:id', () => {
      it('should update a review', async () => {
        const updatedReview = { rating: 4, comment: 'Good product!', product: 'product123', user: 'user123' };
        Review.findById.mockResolvedValue({
          save: jest.fn().mockResolvedValue(updatedReview)
        });
  
        const res = await request(app)
          .put('/api/reviews/review123')
          .set('Authorization', `Bearer ${userToken}`)
          .send(updatedReview);
  
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('comment', 'Good product!');
      });

        it('should return 404 if review not found', async () => {
            Review.findById.mockResolvedValue(null);
    
            const res = await request(app)
            .put('/api/reviews/review123')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ rating: 4, comment: 'Good product!', product: 'product123', user: 'user123' });
    
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Review not found');
        });
    });
  
    describe('DELETE /api/reviews/:id', () => {
      it('should delete a review', async () => {
        Review.findById.mockResolvedValue({ remove: jest.fn().mockResolvedValue({}) });
  
        const res = await request(app)
          .delete('/api/reviews/review123')
          .set('Authorization', `Bearer ${userToken}`);
  
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Review deleted');
      });

        it('should return 404 if review not found', async () => {
            Review.findById.mockResolvedValue(null);
    
            const res = await request(app)
            .delete('/api/reviews/review123')
            .set('Authorization', `Bearer ${userToken}`);
    
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Review not found');
        });
    });

    describe('GET /api/reviews/product/:id', () => {
        it('should return all reviews for a product', async () => {
          Review.find.mockResolvedValue([
            { rating: 5, comment: 'Excellent!', product: 'product123', user: 'user123' },
            { rating: 4, comment: 'Good product!', product: 'product123', user: 'user123' }
          ]);
    
          const res = await request(app).get('/api/reviews/product/product123');
    
          expect(res.statusCode).toEqual(200);
          expect(res.body.length).toEqual(2);
        });

        it('should return 404 if product not found', async () => {
            Review.find.mockResolvedValue([]);
      
            const res = await request(app).get('/api/reviews/product/product123');
      
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'No reviews found for this product');
        });
    });

    // get avarage rating for a product
    describe('GET /api/reviews/average/:id', () => {
        it('should return avarage rating for a product', async () => {
          Review.find.mockResolvedValue([
            { rating: 5, comment: 'Excellent!', product: 'product123', user: 'user123' },
            { rating: 4, comment: 'Good product!', product: 'product123', user: 'user123' }
          ]);
    
          const res = await request(app).get('/api/reviews/average/product123');
    
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('averageRating', 4.5);
        });

        it('should return 404 if product not found', async () => {
            Review.find.mockResolvedValue([]);
      
            const res = await request(app).get('/api/reviews/average/product123');
      
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'No reviews found for this product');
        });
    });
  });