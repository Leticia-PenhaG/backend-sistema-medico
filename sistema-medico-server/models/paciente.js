'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
    }
  }
  Paciente.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    cedula: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};