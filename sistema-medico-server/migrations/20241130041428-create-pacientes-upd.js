'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla de Pacientes
    await queryInterface.createTable('Pacientes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
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

    // Crear la relación con FichasClinicas
    await queryInterface.addColumn('FichasClinicas', 'pacienteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Pacientes', // Tabla a la que hace referencia
        key: 'id', // Campo de la tabla Pacientes
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la columna pacienteId de FichasClinicas
    await queryInterface.removeColumn('FichasClinicas', 'pacienteId');

    // Eliminar la tabla de Pacientes
    await queryInterface.dropTable('Pacientes');
  },
};
