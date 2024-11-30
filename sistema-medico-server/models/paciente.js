'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
      // Asociación con FichaClinica
      Paciente.hasMany(models.FichasClinicas, {
        foreignKey: 'pacienteId', // Este campo usará el ID de pacientes
        as: 'fichas',
      });
    }
  }

  Paciente.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Paciente',
    }
  );
  return Paciente;
};
