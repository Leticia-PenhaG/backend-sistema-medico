const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient'); 
const Doctor = require('./Doctor');  

class ClinicalRecord extends Model {}

ClinicalRecord.init(
  {
    
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ClinicalRecord',
    tableName: 'clinical_records', 
  }
);


ClinicalRecord.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
ClinicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = ClinicalRecord;
