'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HistorialClinico extends Model {
    static associate(models) {
      HistorialClinico.belongsTo(models.Paciente, {
        foreignKey: 'pacienteId',
        as: 'paciente',
      });
    }
  }
  HistorialClinico.init(
    {
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      diagnostico: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pacientes',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'HistorialClinico',
    }
  );
  return HistorialClinico;
};
