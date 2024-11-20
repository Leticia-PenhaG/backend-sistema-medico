const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const ClinicalRecord = sequelize.define('ClinicalRecord', {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patients', 
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Doctors', 
      key: 'id',
    },
  },
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
}, {
  tableName: 'clinical_records',
  timestamps: true, 
});

module.exports = ClinicalRecord;
