const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dbConnectionString = require('./dbConfig');

const productRoutes = require('./routes/productRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const userRoutes = require('./routes/userRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// Enable CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use routes for different classes
app.use('/api/products', productRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/shopping-cart', shoppingCartRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Export the app for testing purposes
module.exports = app;

// Start server only if this file is run directly (not during tests)
if (require.main === module) {
  // Connect to the MongoDB database
  mongoose.connect(dbConnectionString)
    .then(() => {
      console.log('Successfully connected to the MongoDB database');

      app.listen(PORT, () => {
        console.log(`Backend server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to the MongoDB database:', err);
      process.exit(1);
    });
}
