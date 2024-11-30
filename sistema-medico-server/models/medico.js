'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medico extends Model {
    static associate(models) {
      // Aquí se define la relación hasMany correctamente
      Medico.hasMany(models.FichasClinicas, {
        foreignKey: 'medicoId',
        as: 'fichas',
      });
    }
  }

  Medico.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      especialidad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Medico',
    }
  );
  return Medico;
};
