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
      detallesConsulta,  
      motivoConsulta,
      diagnostico,
      tratamiento,
      fecha  // Se agrega fecha
    });

    res.status(201).json(ficha);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la ficha clínica', details: err });
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
    res.status(500).json({ error: 'Error al obtener las fichas clínicas', details: err });
  }
});

// Obtener ficha clínica por ID
router.get('/:id', async (req, res) => {
  try {
    const ficha = await FichaClinica.findByPk(req.params.id, {
      include: ['paciente', 'medico'],
    });
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });
    res.json(ficha);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la ficha clínica', details: err });
  }
});

module.exports = router;
