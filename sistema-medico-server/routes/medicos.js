/*const express = require("express");
const router = express.Router();
const pool = require("../server"); 

// Crear un nuevo médico
router.post("/", async (req, res) => {
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, username, password } = req.body;

    if (!nombre || !apellido || !cedula || !email || !telefono || !fechaNacimiento || !especialidad || !username || !password) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    const sql = `
        INSERT INTO Medicos (nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, username, password)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, crypt($9, gen_salt('bf'))) RETURNING *`;
    
    try {
        const resultado = await pool.query(sql, [nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, username, password]);
        res.status(201).json({ mensaje: "Médico registrado correctamente.", medico: resultado.rows[0] });
    } catch (error) {
        console.error("Error al crear médico:", error);
        res.status(500).send("Error al crear médico.");
    }
});

// Obtener todos los médicos
router.get("/", async (req, res) => {
    const sql = "SELECT * FROM Medicos";
    try {
        const resultado = await pool.query(sql);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener médicos:", error);
        res.status(500).send("Error al obtener médicos.");
    }
});

// Actualizar un médico
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, username, password } = req.body;

    const sql = `
        UPDATE Medicos
        SET nombre = $1, apellido = $2, cedula = $3, email = $4, telefono = $5, fechaNacimiento = $6, especialidad = $7, username = $8, password = crypt($9, gen_salt('bf'))
        WHERE id = $10 RETURNING *`;

    try {
        const resultado = await pool.query(sql, [nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, username, password, id]);
        if (resultado.rowCount === 0) return res.status(404).send("Médico no encontrado.");
        res.status(200).json({ mensaje: "Médico actualizado.", medico: resultado.rows[0] });
    } catch (error) {
        console.error("Error al actualizar médico:", error);
        res.status(500).send("Error al actualizar médico.");
    }
});

// Eliminar un médico
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Medicos WHERE id = $1 RETURNING *";
    try {
        const resultado = await pool.query(sql, [id]);
        if (resultado.rowCount === 0) return res.status(404).send("Médico no encontrado.");
        res.status(200).send("Médico eliminado.");
    } catch (error) {
        console.error("Error al eliminar médico:", error);
        res.status(500).send("Error al eliminar médico.");
    }
});

module.exports = router;*/

// routes/medicos.js
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

