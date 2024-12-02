'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
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
      },
      detallesConsulta: {
        type: Sequelize.TEXT,
        allowNull: false,
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
        allowNull: true,
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pacientes',
          key: 'id',
        },
        allowNull: false,
      },
      medicoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Medicos',
          key: 'id',
        },
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
    await queryInterface.dropTable('FichaClinicas');
  },
};
