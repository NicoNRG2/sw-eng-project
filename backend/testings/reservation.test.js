const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');

describe('Reservation API', () => {
  let userToken;
  let adminToken;
  let userId;
  let adminId;
  let productId;

  beforeEach(async () => {
    // Connect to the test database
    const db = 'mongodb://127.0.0.1/testdb';
    await mongoose.connect(db);

    // Clear the database
    await User.deleteMany({});
    await Reservation.deleteMany({});
    await Product.deleteMany({});

    // Create a user
    const user = new User({ username: 'testuser', email: 'testuser@example.com', password: 'password123' });
    await user.save();
    userId = user._id;
    userToken = jwt.sign({ userId: user._id, username: user.username }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });

    // Create an admin user
    const admin = new User({ username: 'admin', email: 'admin@example.com', password: 'password123' });
    await admin.save();
    adminId = admin._id;
    adminToken = jwt.sign({ userId: admin._id, username: admin.username }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });

    // Create a product
    const product = new Product({ name: 'Test Product', category: 'Test', price: 10 });
    await product.save();
    productId = product._id;
  });

  afterEach(async () => {
    // Clear the database
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/reservations', () => {
    it('should get all reservations with admin token', async () => {
      const res = await request(app)
        .get('/api/reservations')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('should return 403 if not admin', async () => {
      const res = await request(app)
        .get('/api/reservations')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('GET /api/reservations/user/:userId', () => {
    it('should get reservations for a specific user with user token', async () => {
      const res = await request(app)
        .get(`/api/reservations/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('should return 401 if no token provided', async () => {
      const res = await request(app)
        .get(`/api/reservations/user/${userId}`);
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('POST /api/reservations', () => {
    it('should create a new reservation with user token', async () => {
      const res = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          pickupTime: new Date(),
          userId: userId,
          items: [
            {
              productId: productId,
              quantity: 2
            }
          ]
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('totalPrice', 20); // 2 items x 10 each
    });
  });

  describe('PUT /api/reservations/:id', () => {
    it('should update an existing reservation with user token', async () => {
      const reservation = new Reservation({
        pickupTime: new Date(),
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: 2
          }
        ],
        totalPrice: 20
      });
      await reservation.save();

      const res = await request(app)
        .put(`/api/reservations/${reservation._id}`)
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
      expect(res.body).toHaveProperty('totalPrice', 30); // 3 items x 10 each
    });
  });

  describe('DELETE /api/reservations/:id', () => {
    it('should delete a reservation with user token', async () => {
      const reservation = new Reservation({
        pickupTime: new Date(),
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: 2
          }
        ],
        totalPrice: 20
      });
      await reservation.save();

      const res = await request(app)
        .delete(`/api/reservations/${reservation._id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Reservation deleted successfully');
    });
  });
});
