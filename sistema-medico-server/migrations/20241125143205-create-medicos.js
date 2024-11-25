'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Medicos', {
      id: {
        type: Sequelize.INTEGER,
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
        allowNull: false,
      },
      fechaNacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      especialidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [[
                'Pediatra', 'Dermatólogo', 'Clínico', 'Cardiólogo', 
                'Neurólogo', 'Oftalmólogo', 'Ginecólogo', 'Cirujano General',
                'Oncólogo', 'Psiquiatra', 'Radiólogo', 'Ortopedista',
                'Endocrinólogo', 'Reumatólogo', 'Infectólogo'
            ]],
        },
    },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Medicos');
  },
};
