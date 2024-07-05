const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Country = sequelize.define('Country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  country_code_two: { type: DataTypes.STRING },
  country_code_three: { type: DataTypes.STRING },
  mobile_code: { type: DataTypes.INTEGER },
  continent_id: { type: DataTypes.INTEGER }
});

module.exports = Country;
