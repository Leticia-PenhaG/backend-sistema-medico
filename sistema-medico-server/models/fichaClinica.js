'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FichaClinica extends Model {
    static associate(models) {
      FichaClinica.belongsTo(models.Paciente, {
        foreignKey: 'pacienteId',
        as: 'paciente',
        onDelete: 'CASCADE', // Elimina las fichas cuando se elimina un paciente
      });
      FichaClinica.belongsTo(models.Medico, {
        foreignKey: 'medicoId',
        as: 'medico',
        onDelete: 'CASCADE', // Elimina las fichas cuando se elimina un médico
      });
    }
  }
  FichaClinica.init(
    {
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      detallesConsulta: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      motivoConsulta: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      diagnostico: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tratamiento: {
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
      medicoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Medicos',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'FichaClinica',
    }
  );
  return FichaClinica;
};


  