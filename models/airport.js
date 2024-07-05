const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const City = require('./city');

const Airport = sequelize.define('Airport', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  icao_code: { type: DataTypes.STRING },
  iata_code: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  latitude_deg: { type: DataTypes.FLOAT },
  longitude_deg: { type: DataTypes.FLOAT },
  elevation_ft: { type: DataTypes.INTEGER },
  city_id: { type: DataTypes.INTEGER, references: { model: City, key: 'id' } }
});

Airport.belongsTo(City, { foreignKey: 'city_id' });

module.exports = Airport;
