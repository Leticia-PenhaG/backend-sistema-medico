const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');

// Obtener todos los pacientes
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los pacientes' });
  }
});

// Crear un paciente
router.post('/', async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201).json(paciente);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el paciente', details: err });
  }
});

// Obtener un paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el paciente' });
  }
});

// Actualizar un paciente
router.put('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    await paciente.update(req.body);
    res.json(paciente);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar el paciente', details: err });
  }
});

// Eliminar un paciente
router.delete('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    await paciente.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
});

module.exports = router;
