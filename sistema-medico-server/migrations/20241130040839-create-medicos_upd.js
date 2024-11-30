'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla de Medicos
    await queryInterface.createTable('Medicos', {
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
      especialidad: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
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
    await queryInterface.addColumn('FichasClinicas', 'medicoId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Medicos', // Tabla a la que hace referencia
        key: 'id', // Campo de la tabla Medicos
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la columna medicoId de FichasClinicas
    await queryInterface.removeColumn('FichasClinicas', 'medicoId');

    // Eliminar la tabla de Medicos
    await queryInterface.dropTable('Medicos');
  },
};
