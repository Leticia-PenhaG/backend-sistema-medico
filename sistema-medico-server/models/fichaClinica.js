module.exports = (sequelize, DataTypes) => {
  const FichasClinicas = sequelize.define('FichasClinicas', {
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
    detallesConsulta: {
      type: DataTypes.TEXT,  // Usar TEXT para texto largo
      allowNull: false,      // El campo sigue siendo obligatorio
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
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'FichasClinicas',
    timestamps: false,
  });

  FichasClinicas.associate = (models) => {
    FichasClinicas.belongsTo(models.Paciente, {
      foreignKey: 'pacienteId',
      as: 'paciente',
    });

    FichasClinicas.belongsTo(models.Medico, {
      foreignKey: 'medicoId',
      as: 'medico',
    });
  };

  return FichasClinicas;
};
