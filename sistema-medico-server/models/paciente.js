'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
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

    // Asociación con el modelo FichaClinica
    Paciente.associate = (models) => {
      Paciente.hasMany(models.FichaClinica, {
        foreignKey: 'pacienteId',
        as: 'fichas',
        onDelete: 'CASCADE',  // Elimina las fichas asociadas al eliminar un paciente
      });
    };
  return Paciente;
};
