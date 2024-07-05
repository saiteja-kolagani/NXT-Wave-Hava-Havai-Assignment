const sequelize = require('./config/database');
const Airport = require('./models/airport');
const City = require('./models/city');
const Country = require('./models/country');
const xlsx = require('xlsx');
const path = require('path');

// Correct the file path
const filePath = path.join(__dirname, 'Database (1).xlsx');
const workbook = xlsx.readFile(filePath);

// Parse each sheet
const airportData = xlsx.utils.sheet_to_json(workbook.Sheets['airport']);
const cityData = xlsx.utils.sheet_to_json(workbook.Sheets['city']);
const countryData = xlsx.utils.sheet_to_json(workbook.Sheets['country']);

sequelize.sync({ force: true }).then(async () => {
  try {
    console.log('Country data:', countryData);
    console.log('City data:', cityData);
    console.log('Airport data:', airportData);

    console.log('Seeding countries...');
    await Country.bulkCreate(countryData);

    console.log('Seeding cities...');
    await City.bulkCreate(cityData);

    console.log('Checking foreign key constraints...');
    const cityIds = cityData.map(city => city.id);
    const invalidAirports = airportData.filter(airport => !cityIds.includes(airport.city_id));
    if (invalidAirports.length > 0) {
      console.error('Invalid city_ids in airport data:', invalidAirports);
      throw new Error('Invalid city_ids in airport data');
    }

    console.log('Seeding airports...');
    await Airport.bulkCreate(airportData);

    console.log('Data has been seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error.message, error.stack);
  } finally {
    process.exit();
  }
});
