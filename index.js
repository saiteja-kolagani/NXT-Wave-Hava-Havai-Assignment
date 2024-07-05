const express = require('express');
const sequelize = require('./config/database');
const airportRoutes = require('./routes/airport');

const app = express();


app.use(express.json());


app.use('/api/airport', airportRoutes);


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
