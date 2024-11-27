const express = require('express');
const router = express.Router();
const { Medico } = require('../models');
const { isValid, parseISO } = require('date-fns');

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
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, username, password } = req.body;

    const fechaNacimientoValida = fechaNacimiento && isValid(parseISO(fechaNacimiento))
      ? parseISO(fechaNacimiento)
      : null;

    const medico = await Medico.create({
      nombre,
      apellido,
      cedula,
      email,
      telefono,
      fechaNacimiento: fechaNacimientoValida,
      especialidad,
      username,
      password,
    });

    res.status(201).json(medico);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el médico', details: err });
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

    const { fechaNacimiento } = req.body;
    const fechaNacimientoValida = fechaNacimiento && isValid(parseISO(fechaNacimiento))
      ? parseISO(fechaNacimiento)
      : undefined;

    const camposActualizables = {
      ...req.body,
      ...(fechaNacimientoValida && { fechaNacimiento: fechaNacimientoValida }),
    };

    await medico.update(camposActualizables);

    res.status(200).json({ message: 'Médico actualizado con éxito', data: medico });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el médico', details: err });
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
    res.status(500).json({ error: 'Error al eliminar el médico', details: err });
  }
});

module.exports = router;