const sequelize = require('./config/database'); // Asegúrate de que la ruta sea correcta
const Paciente = require('./models/Paciente'); // Cambia a ./models/paciente si el archivo está en minúsculas

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Eliminará y recreará todas las tablas
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close(); // Cierra la conexión después de sincronizar
  }
};

syncDatabase();
