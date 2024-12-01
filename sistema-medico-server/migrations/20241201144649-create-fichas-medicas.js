'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FichaClinicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      detallesConsulta: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      motivoConsulta: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      diagnostico: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tratamiento: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pacientes',
          key: 'id',
        },
      },
      medicoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medicos',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FichaClinicas');
  },
};
