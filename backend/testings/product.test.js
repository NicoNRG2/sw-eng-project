const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
const Product = require('../models/product');

jest.mock('../models/product');

describe('Product API', () => {
  let adminToken;

  beforeAll(() => {
    // Mock JWT token
    adminToken = jwt.sign({ userId: 'admin123', username: 'admin' }, 'EbVkQJufAyrTFJGf', { expiresIn: '1h' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      Product.find.mockResolvedValue([{ name: 'Product1' }, { name: 'Product2' }]);

      const res = await request(app).get('/api/products');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = { name: 'New Product', price: 10 };
      Product.prototype.save = jest.fn().mockResolvedValue(newProduct);

      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProduct);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'New Product');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get a product by id', async () => {
      Product.findById.mockResolvedValue({ name: 'Product1' });

      const res = await request(app).get('/api/products/product123');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Product1');
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);

      const res = await request(app).get('/api/products/product123');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
      const updatedProduct = { name: 'Updated Product' };
      Product.findById.mockResolvedValue({ save: jest.fn().mockResolvedValue(updatedProduct) });

      const res = await request(app)
        .put('/api/products/product123')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedProduct);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Updated Product');
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/products/product123')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Updated Product' });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      Product.findById.mockResolvedValue({ remove: jest.fn().mockResolvedValue({}) });

      const res = await request(app)
        .delete('/api/products/product123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Product deleted');
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);

      const res = await request(app)
        .delete('/api/products/product123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

  describe('GET /api/products/type/:type', () => {
    it('should get all products by type', async () => {
      Product.find.mockResolvedValue([{ name: 'Product1' }, { name: 'Product2' }]);

      const res = await request(app).get('/api/products/type/food');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
    });
  });
});
