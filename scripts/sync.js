
const sequelize = require('./config/database');
const Patient = require('./models/patient');
const Doctor = require('./models/doctor');
const ClinicalRecord = require('./models/clinicalRecord');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();
