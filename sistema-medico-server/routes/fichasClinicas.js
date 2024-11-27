const express = require('express');
const router = express.Router();
const { FichaClinica, Paciente, Medico } = require('../models');

// Crear ficha clínica
router.post('/', async (req, res) => {
  try {
    const { pacienteId, medicoId, motivoConsulta, diagnostico, tratamiento } = req.body;

    const ficha = await FichaClinica.create({
      pacienteId,
      medicoId,
      motivoConsulta,
      diagnostico,
      tratamiento,
    });

    res.status(201).json(ficha);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la ficha clínica' });
  }
});

// Obtener todas las fichas clínicas
router.get('/', async (req, res) => {
  try {
    const fichas = await FichaClinica.findAll({
      include: ['paciente', 'medico'],
    });
    res.json(fichas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las fichas clínicas' });
  }
});

module.exports = router;

