const express = require('express');
const sequelize = require('./config/database');
const airportRoutes = require('./routes/airport');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/airport', airportRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
