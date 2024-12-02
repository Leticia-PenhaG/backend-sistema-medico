'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fechaNacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      especialidad: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medicos');
  },
};
