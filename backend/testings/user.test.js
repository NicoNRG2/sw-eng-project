const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

jest.mock('../models/user');

describe('User API', () => {
  let token;
  let adminToken;

  beforeAll(() => {
    // Mock JWT token
    token = jwt.sign({ userId: 'user123', username: 'testuser' }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });
    adminToken = jwt.sign({ userId: 'admin123', username: 'admin' }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should get all users', async () => {
      User.find.mockResolvedValue([{ username: 'testuser1' }, { username: 'testuser2' }]);

      const res = await request(app).get('/api/users');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = { username: 'testuser', password: 'password123' };
      User.prototype.save = jest.fn().mockResolvedValue(newUser);

      const res = await request(app)
        .post('/api/users')
        .send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('username', 'testuser');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a user by id', async () => {
      User.findById.mockResolvedValue({ username: 'testuser' });

      const res = await request(app).get('/api/users/user123');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);

      const res = await request(app).get('/api/users/user123');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const updatedUser = { username: 'updateduser' };
      User.findById.mockResolvedValue({ save: jest.fn().mockResolvedValue(updatedUser) });

      const res = await request(app)
        .put('/api/users/user123')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'updateduser');
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/users/user123')
        .set('Authorization', `Bearer ${token}`)
        .send({ username: 'updateduser' });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      User.findById.mockResolvedValue({ remove: jest.fn().mockResolvedValue({}) });

      const res = await request(app)
        .delete('/api/users/user123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User deleted');
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);

      const res = await request(app)
        .delete('/api/users/user123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('Login /api/users/login', () => {
    it('should login a user and return a token', async () => {
      const user = { _id: 'user123', username: 'testuser', password: await bcrypt.hash('password123', 10) };
      User.findOne.mockResolvedValue(user);

      const res = await request(app)
        .post('/api/users/login')
        .send({ username: 'testuser', password: 'password123' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/users/login')
        .send({ username: 'testuser', password: 'password123' });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 401 if password is incorrect', async () => {
      const user = { _id: 'user123', username: 'testuser', password: await bcrypt.hash('password123', 10) };
      User.findOne.mockResolvedValue(user);

      const res = await request(app)
        .post('/api/users/login')
        .send({ username: 'testuser', password: 'password' });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid password');
    });
  });
});
