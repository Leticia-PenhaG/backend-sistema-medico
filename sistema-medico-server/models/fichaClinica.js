'use strict';
module.exports = (sequelize, DataTypes) => {
  const FichaClinica = sequelize.define('FichaClinica', {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    detallesConsulta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    motivoConsulta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diagnostico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tratamiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  // Relaciones
  FichaClinica.associate = (models) => {
    // Relación con Paciente
    FichaClinica.belongsTo(models.Paciente, {
      foreignKey: 'pacienteId',
      as: 'paciente',
    });

    // Relación con Medico
    FichaClinica.belongsTo(models.Medico, {
      foreignKey: 'medicoId',
      as: 'medico',
    });
  };

  return FichaClinica;
};
