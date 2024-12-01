module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pacientes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cedula: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fechaNacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pacientes');
  }
};
