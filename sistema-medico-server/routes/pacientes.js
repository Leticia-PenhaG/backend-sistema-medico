const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');
const { parseISO, isValid } = require('date-fns');
const { format } = require('date-fns');

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
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento } = req.body;

    // Validar formato de fecha
    const fechaNacimientoValida = fechaNacimiento && isValid(parseISO(fechaNacimiento))
    ? parseISO(fechaNacimiento)
    : null;

    const paciente = await Paciente.create({
      nombre,
      apellido,
      cedula,
      email,
      telefono,
      fechaNacimiento: fechaNacimientoValida,
    });

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


router.patch('/:id', async (req, res) => {
  try {
    const pacienteId = parseInt(req.params.id, 10);
    console.log("ID recibido para actualizar:", pacienteId); // Log del ID

    if (isNaN(pacienteId)) {
      return res.status(400).json({ error: 'El ID debe ser un número válido.' });
    }

    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
    }

    console.log("Datos recibidos para actualizar:", req.body); // Log de los datos recibidos

    const { nombre, apellido, cedula, email, telefono, fechaNacimiento } = req.body;
    const fechaNacimientoValida =
      fechaNacimiento && isValid(parseISO(fechaNacimiento))
        ? parseISO(fechaNacimiento)
        : undefined;

    const camposActualizables = {
      ...(nombre && { nombre }),
      ...(apellido && { apellido }),
      ...(cedula && { cedula }),
      ...(email && { email }),
      ...(telefono && { telefono }),
      ...(fechaNacimientoValida && { fechaNacimiento: fechaNacimientoValida }),
    };

    if (Object.keys(camposActualizables).length === 0) {
      return res
        .status(400)
        .json({ error: 'No se proporcionaron datos para actualizar.' });
    }

    await paciente.update(camposActualizables);

    res.status(200).json({
      message: 'Paciente actualizado con éxito.',
      data: paciente,
    });
  } catch (error) {
    console.error('Error al actualizar el paciente:', error);
    res.status(500).json({ error: 'Error al actualizar el paciente.' });
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
