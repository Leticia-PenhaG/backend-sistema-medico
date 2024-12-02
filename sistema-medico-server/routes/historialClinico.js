const express = require('express');
const router = express.Router();
const { FichaClinica, Paciente, Medico } = require('../models');
const { Op } = require('sequelize');


// Obtener historial con filtros
router.get('/', async (req, res) => {
  try {
    const { search, especialidad, paciente, medico, fechaInicio, fechaFin } = req.query;

    const filters = {
      ...(especialidad && {
        '$medico.especialidad$': especialidad,
      }),
      ...(paciente && {
        '$paciente.id$': paciente,
      }),
      ...(medico && {
        '$medico.id$': medico,
      }),
      ...(search && {
        [Op.or]: [
          { '$paciente.nombre$': { [Op.like]: `%${search}%` } },
          { '$paciente.apellido$': { [Op.like]: `%${search}%` } },
          { '$medico.nombre$': { [Op.like]: `%${search}%` } },
          { '$medico.apellido$': { [Op.like]: `%${search}%` } },
          { detallesConsulta: { [Op.like]: `%${search}%` } },
        ],
      }),
      ...(fechaInicio && fechaFin && {
        fecha: {
          [Op.between]: [new Date(fechaInicio), new Date(fechaFin)],
        },
      }),
    };

    const historial = await FichaClinica.findAll({
      where: filters,
      include: [
        { model: Paciente, as: 'paciente', attributes: ['nombre', 'apellido'] },
        { model: Medico, as: 'medico', attributes: ['nombre', 'apellido', 'especialidad'] },
      ],
    });

    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial', details: err });
  }
});

module.exports = router;



/*const express = require('express');
const router = express.Router();
const { FichaClinica, Paciente, Medico } = require('../models');
const { Op } = require('sequelize');

// Obtener historial con filtros
router.get('/', async (req, res) => {
  try {
    const { search, especialidad, fechaInicio, fechaFin } = req.query;

    const filters = {
      ...(especialidad && {
        '$medico.especialidad$': especialidad,
      }),
      ...(search && {
        [Op.or]: [
          { '$paciente.nombre$': { [Op.like]: `%${search}%` } },
          { '$paciente.apellido$': { [Op.like]: `%${search}%` } },
          { '$medico.nombre$': { [Op.like]: `%${search}%` } },
          { '$medico.apellido$': { [Op.like]: `%${search}%` } },
          { detallesConsulta: { [Op.like]: `%${search}%` } },
        ],
      }),
      ...(fechaInicio && fechaFin && {
        fecha: {
          [Op.between]: [new Date(fechaInicio), new Date(fechaFin)],
        },
      }),
    };

    const historial = await FichaClinica.findAll({
      where: filters,
      include: [
        { model: Paciente, as: 'paciente', attributes: ['nombre', 'apellido'] },
        { model: Medico, as: 'medico', attributes: ['nombre', 'apellido', 'especialidad'] },
      ],
    });

    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial', details: err });
  }
});

module.exports = router;*/
