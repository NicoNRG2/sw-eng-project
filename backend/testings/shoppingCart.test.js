const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user');
const ShoppingCart = require('../models/shoppingCart');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');

describe('Shopping Cart API', () => {
  let userToken;
  let userId;
  let productId;
  let cartId;

  beforeEach(async () => {
    // Connect to the test database
    const db = 'mongodb://127.0.0.1/testdb';
    await mongoose.connect(db);

    // Clear the database
    await User.deleteMany({});
    await ShoppingCart.deleteMany({});
    await Product.deleteMany({});

    // Create a user
    const user = new User({ username: 'testuser1', email: 'testuser1@example.com', password: 'password123' });
    await user.save();
    userId = user._id;
    userToken = jwt.sign({ userId: user._id, username: user.username }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });

    // Create a product
    const product = new Product({ name: 'Test Product', category: 'Test', price: 10 });
    await product.save();
    productId = product._id;

    // Create a shopping cart
    const cart = new ShoppingCart({ userId, items: [{ productId, quantity: 1 }] });
    await cart.save();
    cartId = cart._id;
  });

  afterEach(async () => {
    // Clear the database
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/shopping-cart/user/:userId', () => {
    it('should get the shopping cart for a specific user', async () => {
      const res = await request(app)
        .get(`/api/shopping-cart/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('items');
    });
  });

  describe('POST /api/shopping-cart/add', () => {
    it('should add items to the shopping cart', async () => {
      const res = await request(app)
        .post('/api/shopping-cart/add')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userId: userId,
          productId: productId,
          quantity: 2
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.items.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/shopping-cart/remove', () => {
    it('should remove items from the shopping cart', async () => {
      const res = await request(app)
        .post('/api/shopping-cart/remove')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userId: userId,
          productId: productId
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.items.length).toBe(0);
    });
  });

  describe('PUT /api/shopping-cart/:id', () => {
    it('should update items in the shopping cart', async () => {
      const res = await request(app)
        .put(`/api/shopping-cart/${cartId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              productId: productId,
              quantity: 3
            }
          ]
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.items[0]).toHaveProperty('quantity', 3);
    });

    it('should return 404 if the shopping cart is not found', async () => {
      const res = await request(app)
        .put(`/api/shopping-cart/23f3`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              productId: productId,
              quantity: 3
            }
          ]
        });

      expect(res.statusCode).toEqual(404);
    });
  });
});
