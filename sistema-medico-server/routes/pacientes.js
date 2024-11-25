const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');
const { parseISO, isValid } = require('date-fns');

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

    // Validar si el ID es un número válido
    if (isNaN(pacienteId)) {
      return res.status(400).json({ error: 'El ID debe ser un número válido.' });
    }

    // Buscar el paciente por ID
    const paciente = await Paciente.findByPk(pacienteId);

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
    }

    // Obtener datos del cuerpo de la solicitud
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento } = req.body;

    // Crear un objeto con los campos actualizados
    const updateData = {};
    if (nombre) updateData.nombre = nombre;
    if (apellido) updateData.apellido = apellido;
    if (cedula) updateData.cedula = cedula;
    if (email) updateData.email = email;
    if (telefono) updateData.telefono = telefono;
    if (fechaNacimiento) updateData.fechaNacimiento = fechaNacimiento;

    // Actualizar el paciente
    const updatedPaciente = await paciente.update(updateData);

    res.status(200).json({
      message: 'Paciente actualizado con éxito.',
      data: updatedPaciente,
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
