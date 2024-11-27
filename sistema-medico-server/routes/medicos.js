const express = require('express');
const router = express.Router();
const { Medico } = require('../models');

// Obtener todos los médicos
router.get('/', async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los médicos' });
  }
});

// Crear un médico
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, usuario, contrasena } = req.body;
    const medico = await Medico.create({
      nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, usuario, contrasena
    });
    res.status(201).json(medico);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el médico' });
  }
});

// Obtener un médico por ID
router.get('/:id', async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el médico' });
  }
});

// Actualizar un médico
router.patch('/:id', async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });

    await medico.update(req.body);
    res.status(200).json({ message: 'Médico actualizado con éxito', data: medico });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el médico' });
  }
});

// Eliminar un médico
router.delete('/:id', async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });

    await medico.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el médico' });
  }
});

module.exports = router;

