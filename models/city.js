const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./country');

const City = sequelize.define('City', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  alt_name: { type: DataTypes.STRING },
  country_id: { type: DataTypes.INTEGER, references: { model: Country, key: 'id' } },
  is_active: { type: DataTypes.BOOLEAN },
  lat: { type: DataTypes.FLOAT },
  long: { type: DataTypes.FLOAT }
});

City.belongsTo(Country, { foreignKey: 'country_id' });

module.exports = City;
