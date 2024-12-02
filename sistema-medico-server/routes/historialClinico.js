const express = require('express');
const router = express.Router();
const { FichaClinica, Paciente, Medico } = require('../models');
const { Op } = require('sequelize');

// Obtener historial de consultas con filtros
router.get('/', async (req, res) => {
  const { pacienteId, medicoId, fechaInicio, fechaFin, texto, especialidad } = req.query;

  try {
    const fichas = await FichaClinica.findAll({
      where: {
        ...(pacienteId && { pacienteId }), // Filtro por paciente
        ...(medicoId && { medicoId }),   // Filtro por médico
        ...(fechaInicio && { fecha: { [Op.gte]: fechaInicio } }), // Filtro por fecha de inicio
        ...(fechaFin && { fecha: { [Op.lte]: fechaFin } }),       // Filtro por fecha de fin
        ...(texto && { detallesConsulta: { [Op.iLike]: `%${texto}%` } }), // Filtro por texto en detalles
      },
      include: [
        {
          model: Paciente,
          as: 'paciente',
        },
        {
          model: Medico,
          as: 'medico',
          where: {
            ...(especialidad && { especialidad }), // Filtro por especialidad
          },
        },
      ],
    });

    res.json(fichas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial clínico', details: err.message });
  }
});

module.exports = router;
