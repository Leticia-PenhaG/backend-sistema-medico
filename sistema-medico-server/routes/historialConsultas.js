// routes/historialConsultas.js
const express = require('express');
const router = express.Router();
const { FichaClinica } = require('../models');

// Obtener historial de consultas con filtros
router.get('/', async (req, res) => {
  const { pacienteId, medicoId, fechaInicio, fechaFin, especialidad } = req.query;
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
    res.status(500).json({ error: 'Error al obtener el historial de consultas' });
  }
});

module.exports = router;
