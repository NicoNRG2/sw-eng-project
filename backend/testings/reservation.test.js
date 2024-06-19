const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/reservation');
const User = require('../models/user');
const Product = require('../models/product');

jest.mock('../models/reservation');
jest.mock('../models/user');
jest.mock('../models/product');

describe('Reservation API', () => {
  let adminToken;

  beforeAll(() => {
    // Mock JWT token
    adminToken = jwt.sign({ userId: 'admin123', username: 'admin' }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/reservations', () => {
    it('should get all reservations', async () => {
      Reservation.find.mockResolvedValue([{ _id: 'res1', status: 'pending' }, { _id: 'res2', status: 'confirmed' }]);

      const res = await request(app).get('/api/reservations');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('GET /api/reservations/user/:userId', () => {
    it('should get reservations by user', async () => {
      Reservation.find.mockResolvedValue([{ _id: 'res1', userId: 'user1', status: 'pending' }]);

      const res = await request(app).get('/api/reservations/user/user1');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('POST /api/reservations', () => {
    it('should create a new reservation', async () => {
      const newReservation = { pickupTime: '2023-01-01T10:00:00Z', status: 'pending', userId: 'user1', items: [{ productId: 'prod1', quantity: 2 }] };
      Product.findById.mockResolvedValue({ _id: 'prod1', price: 100 });
      Reservation.prototype.save = jest.fn().mockResolvedValue(newReservation);

      const res = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newReservation);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('status', 'pending');
    });
  });

  describe('PUT /api/reservations/:id', () => {
    it('should update a reservation', async () => {
      const updatedReservation = { pickupTime: '2023-01-02T10:00:00Z', status: 'confirmed' };
      Reservation.findByIdAndUpdate.mockResolvedValue(updatedReservation);

      const res = await request(app)
        .put('/api/reservations/res1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedReservation);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'confirmed');
    });

    it('should return 404 if reservation not found', async () => {
      Reservation.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/reservations/res1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'confirmed' });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Reservation not found');
    });
  });

  describe('DELETE /api/reservations/:id', () => {
    it('should delete a reservation', async () => {
      Reservation.findByIdAndDelete.mockResolvedValue({});

      const res = await request(app)
        .delete('/api/reservations/res1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Reservation deleted successfully');
    });

    it('should return 404 if reservation not found', async () => {
      Reservation.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app)
        .delete('/api/reservations/res1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Reservation not found');
    });
  });
});
