'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ficha = sequelize.define('Ficha', {
    fecha: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    motivo: DataTypes.TEXT,
    diagnostico: DataTypes.TEXT,
    tratamiento: DataTypes.TEXT,
  }, {});
  Ficha.associate = function(models) {
    Ficha.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    Ficha.belongsTo(models.Medico, { foreignKey: 'medico_id' });
  };
  return Ficha;
};
