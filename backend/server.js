const express = require('express');
const mongoose = require('mongoose');
const dbConnectionString = require('./dbConfig');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Connect to the MongoDB database
mongoose.connect(dbConnectionString)
  .then(() => {
    console.log('Successfully connected to the MongoDB database');
  })
  .catch((err) => {
    console.error('Error connecting to the MongoDB database:', err);
    process.exit(1);
  });

// Use routes for products
app.use('/api/products', productRoutes);
// Use routes for reviews
app.use('/api/reviews', reviewRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
