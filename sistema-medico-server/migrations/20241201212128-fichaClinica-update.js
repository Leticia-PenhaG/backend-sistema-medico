module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FichaClinicas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        onDelete: 'CASCADE', // Eliminar fichas cuando se elimine un paciente
      },
      medicoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medicos',
          key: 'id',
        },
        onDelete: 'CASCADE', // Eliminar fichas cuando se elimine un médico
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
    await queryInterface.dropTable('FichaClinicas');
  }
};
