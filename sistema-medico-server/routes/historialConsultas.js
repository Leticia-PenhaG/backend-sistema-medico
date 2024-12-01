
const express = require('express');
const router = express.Router();
const { HistorialClinico } = require('../models');
const { Op } = require('sequelize');

// Crear un historial
router.post('/', async (req, res) => {
  try {
    const { pacienteId, fecha, diagnostico } = req.body;
    const historial = await HistorialClinico.create({
      pacienteId,
      fecha,
      diagnostico,
    });
    res.status(201).json(historial);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el historial', details: error.message });
  }
});

// Obtener todos los historiales
router.get('/', async (req, res) => {
  const { pacienteId, fechaInicio, fechaFin } = req.query;

  try {
    const historiales = await HistorialClinico.findAll({
      where: {
        ...(pacienteId && { pacienteId }),
        ...(fechaInicio && { fecha: { [Op.gte]: new Date(fechaInicio) } }),
        ...(fechaFin && { fecha: { [Op.lte]: new Date(fechaFin) } }),
      },
    });

    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los historiales', details: error.message });
  }
});

module.exports = router;


/* 1

const express = require('express');
const router = express.Router();
const { HistorialClinico } = require('../models');

// Crear un historial
router.post('/', async (req, res) => {
  try {
    const historial = await HistorialClinico.create(req.body);
    res.status(201).json(historial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los historiales
router.get('/', async (req, res) => {
  try {
    const historiales = await HistorialClinico.findAll();
    res.status(200).json(historiales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;*/


/* DOS

const express = require('express');
const router = express.Router();
const { FichaClinica, Paciente, Medico } = require('../models');
const { Op } = require('sequelize');

// Obtener historial de consultas con filtros
router.get('/', async (req, res) => {
  const { pacienteId, medicoId, fechaInicio, fechaFin } = req.query;

  try {
    const fichas = await FichaClinica.findAll({
      where: {
        ...(pacienteId && { pacienteId }),
        ...(medicoId && { medicoId }),
        ...(fechaInicio && { fecha: { [Op.gte]: new Date(fechaInicio) } }),
        ...(fechaFin && { fecha: { [Op.lte]: new Date(fechaFin) } }),
      },
      include: ['paciente', 'medico'],
    });

    res.json(fichas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial clínico', details: err });
  }
});

module.exports = router;


*/


/*router.get('/historial', async (req, res) => {
  try {
    const { pacienteId, medicoId, fecha, motivoConsulta, diagnostico, especialidad } = req.query;

    const whereClause = {};
    if (pacienteId) whereClause.pacienteId = pacienteId;
    if (medicoId) whereClause.medicoId = medicoId;
    if (fecha) whereClause.fecha = fecha;
    if (motivoConsulta) whereClause.motivoConsulta = { [Op.iLike]: `%${motivoConsulta}%` };
    if (diagnostico) whereClause.diagnostico = { [Op.iLike]: `%${diagnostico}%` };

    const fichas = await FichaClinica.findAll({
      where: whereClause,
      include: [
        {
          model: Paciente,
          as: 'paciente',
          attributes: ['nombre', 'apellido'],
        },
        {
          model: Medico,
          as: 'medico',
          attributes: ['nombre', 'apellido', 'especialidad'],
          where: especialidad ? { especialidad: { [Op.iLike]: `%${especialidad}%` } } : undefined,
        },
      ],
    });

    res.json(fichas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial de consultas' });
  }
});
*/