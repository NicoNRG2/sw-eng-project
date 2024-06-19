const request = require('supertest');
const app = require('../server'); 
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User API', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = {
      _id: '1',
      name: 'Test',
      surname: 'User',
      email: 'testuser@example.com',
      username: 'testuser',
      password: 'hashedpassword'
    };
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      User.find.mockResolvedValue([mockUser]);
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([mockUser]);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a single user by ID', async () => {
      User.findById.mockResolvedValue(mockUser);
      const res = await request(app).get('/api/users/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);
      const res = await request(app).get('/api/users/1');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('User not found');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      User.prototype.save.mockResolvedValue(mockUser);
      const res = await request(app).post('/api/users').send(mockUser);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockUser);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update an existing user', async () => {
      User.findById.mockResolvedValue(mockUser);
      User.prototype.save.mockResolvedValue(mockUser);
      const res = await request(app).put('/api/users/1').send(mockUser);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);
      const res = await request(app).put('/api/users/1').send(mockUser);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('User not found');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      User.findById.mockResolvedValue(mockUser);
      User.prototype.remove = jest.fn().mockResolvedValue(mockUser);
      const res = await request(app).delete('/api/users/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User deleted');
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);
      const res = await request(app).delete('/api/users/1');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('User not found');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user and return a token', async () => {
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fakeToken');
      const res = await request(app).post('/api/users/login').send({ username: 'testuser', password: 'password' });
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBe('fakeToken');
    });

    it('should return 400 if username or password is missing', async () => {
      const res = await request(app).post('/api/users/login').send({ username: '', password: '' });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Missing required fields');
    });

    it('should return 400 if user not found', async () => {
      User.findOne.mockResolvedValue(null);
      const res = await request(app).post('/api/users/login').send({ username: 'testuser', password: 'password' });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid username or password');
    });

    it('should return 400 if password does not match', async () => {
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);
      const res = await request(app).post('/api/users/login').send({ username: 'testuser', password: 'wrongpassword' });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid username or password');
    });
  });
});
