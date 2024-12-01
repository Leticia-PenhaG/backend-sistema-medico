/*  'use strict';
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
  }, {});

  // Asociaciones con los modelos Paciente y Medico
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
};*/

/*'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FichaClinica extends Model {
    static associate(models) {
      FichaClinica.belongsTo(models.Paciente, {
        foreignKey: 'pacienteId',
        as: 'paciente',
      });
      FichaClinica.belongsTo(models.Medico, {
        foreignKey: 'medicoId',
        as: 'medico',
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
    },
    {
      sequelize,
      modelName: 'FichaClinica',
    }
  );
  return FichaClinica;
};
*/

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FichaClinica extends Model {
    static associate(models) {
      FichaClinica.belongsTo(models.Paciente, {
        foreignKey: 'pacienteId',
        as: 'paciente',
      });
      FichaClinica.belongsTo(models.Medico, {
        foreignKey: 'medicoId',
        as: 'medico',
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


  