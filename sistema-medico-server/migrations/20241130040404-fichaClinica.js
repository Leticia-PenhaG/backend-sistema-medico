'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FichasClinicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pacientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      medicoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medicos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      detallesConsulta: {
        type: Sequelize.TEXT,  // Usar TEXT para texto largo
        allowNull: false,      // Es obligatorio
      },
      motivoConsulta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      diagnostico: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tratamiento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('FichasClinicas');
  },
};
