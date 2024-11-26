// models/fichaClinica.js
module.exports = (sequelize, DataTypes) => {
    const FichaClinica = sequelize.define('FichaClinica', {
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      motivoConsulta: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      diagnostico: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tratamiento: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    FichaClinica.associate = (models) => {
      FichaClinica.belongsTo(models.Paciente, {
        foreignKey: 'pacienteId',
        as: 'paciente',
      });
      FichaClinica.belongsTo(models.Medico, {
        foreignKey: 'medicoId',
        as: 'medico',
      });
    };
  
    return FichaClinica;
  };
  