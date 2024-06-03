const fs = require('fs');
const https = require('https');
const express = require('express');
const mongoose = require('mongoose');
const dbConnectionString = require('./dbConfig');

const productRoutes = require('./routes/productRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// Enable CORS for all origins
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

// Use routes for different classes
app.use('/api/products', productRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/shopping-cart', shoppingCartRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// HTTPS server setup
const options = {
  key: fs.readFileSync('../server.key'),
  cert: fs.readFileSync('../server.crt')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});