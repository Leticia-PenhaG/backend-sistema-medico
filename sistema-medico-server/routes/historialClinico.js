const express = require('express');
const router = express.Router();
const { FichaClinica, Paciente, Medico } = require('../models');
const { Op } = require('sequelize');

// Obtener historial con filtros
router.get('/', async (req, res) => {
  try {
    const { search, especialidad, fechaInicio, fechaFin } = req.query;

    const filters = {
      ...(especialidad && {
        '$medico.especialidad$': especialidad,
      }),
      ...(search && {
        [Op.or]: [
          { '$paciente.nombre$': { [Op.like]: `%${search}%` } },
          { '$paciente.apellido$': { [Op.like]: `%${search}%` } },
          { '$medico.nombre$': { [Op.like]: `%${search}%` } },
          { '$medico.apellido$': { [Op.like]: `%${search}%` } },
          { detallesConsulta: { [Op.like]: `%${search}%` } },
        ],
      }),
      ...(fechaInicio && fechaFin && {
        fecha: {
          [Op.between]: [new Date(fechaInicio), new Date(fechaFin)],
        },
      }),
    };

    const historial = await FichaClinica.findAll({
      where: filters,
      include: [
        { model: Paciente, as: 'paciente', attributes: ['nombre', 'apellido'] },
        { model: Medico, as: 'medico', attributes: ['nombre', 'apellido', 'especialidad'] },
      ],
    });

    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial', details: err });
  }
});

module.exports = router;

/*const express = require('express');
const { FichaClinica, Paciente, Medico } = require('../models');  // Asegúrate de importar los modelos correctamente
const { Op } = require('sequelize');  // Para las operaciones de Sequelize
const router = express.Router();

// Ruta GET para obtener el historial clínico
router.get('/', async (req, res) => {
  const { pacienteId, medicoId, fechaInicio, fechaFin, texto, especialidad } = req.query;

  try {
    const fichas = await FichaClinica.findAll({
      where: {
        ...(pacienteId && { pacienteId }),
        ...(medicoId && { medicoId }),
        ...(fechaInicio && { fecha: { [Op.gte]: fechaInicio } }),
        ...(fechaFin && { fecha: { [Op.lte]: fechaFin } }),
        ...(texto && {
          [Op.or]: [
            { detallesConsulta: { [Op.iLike]: `%${texto}%` } },
            { motivoConsulta: { [Op.iLike]: `%${texto}%` } },
            { diagnostico: { [Op.iLike]: `%${texto}%` } }
          ]
        }),
      },
      include: [
        {
          model: Paciente,
          as: 'paciente',
          attributes: ['id', 'nombre', 'apellido'],
        },
        {
          model: Medico,
          as: 'medico',
          attributes: ['id', 'nombre', 'apellido', 'especialidad'],
          where: especialidad ? { especialidad: { [Op.iLike]: `%${especialidad}%` } } : undefined,
        },
      ],
      logging: console.log,  //consulta SQL ejecutada
    });

    res.status(200).json(fichas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial clínico', details: err.message });
  }
});


router.post('/historialClinico', (req, res) => {
  const { fechaInicio, fechaFin, texto, pacienteId, medicoId, especialidad } = req.body;

  // lógica para filtrar los historiales clínicos según los parámetros recibidos
  const historialFiltrado = historial.filter(item => {
    return (
      (!fechaInicio || new Date(item.fecha) >= new Date(fechaInicio)) &&
      (!fechaFin || new Date(item.fecha) <= new Date(fechaFin)) &&
      (!texto || item.detallesConsulta.includes(texto)) &&
      (!pacienteId || item.pacienteId === pacienteId) &&
      (!medicoId || item.medicoId === medicoId) &&
      (!especialidad || item.medico.especialidad.includes(especialidad))  // Filtrado por especialidad
    );
  });

  res.json(historialFiltrado);
});

module.exports = router;*/
