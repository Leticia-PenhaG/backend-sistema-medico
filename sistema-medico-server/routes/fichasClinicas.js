const express = require('express');
const router = express.Router();
const { FichaClinica, Paciente, Medico } = require('../models');

// Obtener todas las fichas
router.get('/', async (req, res) => {
  try {
    const fichas = await FichaClinica.findAll({
      include: [
        { model: Paciente, as: 'paciente', attributes: ['nombre', 'apellido'] },
        { model: Medico, as: 'medico', attributes: ['nombre', 'apellido', 'especialidad'] },
      ],
    });
    res.json(fichas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las fichas' });
  }
});

// Crear una ficha
router.post('/', async (req, res) => {
  try {
    const { pacienteId, medicoId, fecha, detallesConsulta, motivoConsulta, diagnostico, tratamiento } = req.body;

    const ficha = await FichaClinica.create({
      pacienteId,
      medicoId,
      fecha,
      detallesConsulta,
      motivoConsulta,
      diagnostico,
      tratamiento,
    });

    res.status(201).json(ficha);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la ficha', details: err });
  }
});

// Obtener ficha por ID
router.get('/:id', async (req, res) => {
  try {
    const ficha = await FichaClinica.findByPk(req.params.id, {
      include: [
        { model: Paciente, as: 'paciente', attributes: ['nombre', 'apellido'] },
        { model: Medico, as: 'medico', attributes: ['nombre', 'apellido', 'especialidad'] },
      ],
    });
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });
    res.json(ficha);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la ficha' });
  }
});

// Eliminar ficha
router.delete('/:id', async (req, res) => {
  try {
    const ficha = await FichaClinica.findByPk(req.params.id);
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });

    await ficha.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la ficha' });
  }
});

module.exports = router;
