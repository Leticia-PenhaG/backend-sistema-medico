const express = require("express");
const router = express.Router();
const pool = require("../server"); 

// Obtener todos los pacientes
router.get("/", async (req, res) => {
    const sql = "SELECT * FROM pacientes";
    try {
        const result = await req.db.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al obtener pacientes:", error);
        res.status(500).send("Error al obtener la lista de pacientes.");
    }
});

// Obtener un paciente por ID
router.get("/:id", async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);

    if (isNaN(pacienteId)) {
        return res.status(400).send("El ID debe ser un número válido.");
    }

    const sql = "SELECT * FROM pacientes WHERE id = $1";
    try {
        const result = await req.db.query(sql, [pacienteId]);
        if (result.rows.length === 0) {
            return res.status(404).send("Paciente no encontrado.");
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        res.status(500).send("Error al obtener el paciente.");
    }
});

// Crear un nuevo paciente
router.post("/", async (req, res) => {
    console.log("Datos recibidos:", req.body);
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento } = req.body;

    if (!nombre || !apellido || !cedula || !email || !telefono || !fechaNacimiento) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    const sql = `
        INSERT INTO pacientes (nombre, apellido, cedula, email, telefono, fechaNacimiento)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    try {
        const result = await req.db.query(sql, [nombre, apellido, cedula, email, telefono, fechaNacimiento]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear el paciente:", error);
        res.status(500).send("Error al crear el paciente.");
    }
});

// Actualizar un paciente por ID
router.patch("/:id", async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);

    if (isNaN(pacienteId)) {
        return res.status(400).send("El ID debe ser un número válido.");
    }

    const { nombre, apellido, cedula, email, telefono, fechaNacimiento } = req.body;

    if (!nombre || !apellido || !cedula || !email || !telefono || !fechaNacimiento) {
        return res.status(400).send("Todos los campos son obligatorios para la actualización.");
    }

    const sql = `
        UPDATE pacientes 
        SET nombre = $1, apellido = $2, cedula = $3, email = $4, telefono = $5, fechaNacimiento = $6 
        WHERE id = $7 RETURNING *`;

    try {
        const result = await req.db.query(sql, [nombre, apellido, cedula, email, telefono, fechaNacimiento, pacienteId]);
        if (result.rowCount === 0) {
            return res.status(404).send("Paciente no encontrado.");
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar el paciente:", error);
        res.status(500).send("Error al actualizar el paciente.");
    }
});

// Eliminar un paciente por ID
router.delete("/:id", async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);

    if (isNaN(pacienteId)) {
        return res.status(400).send("El ID debe ser un número válido.");
    }

    const sql = "DELETE FROM pacientes WHERE id = $1 RETURNING *";
    try {
        const result = await req.db.query(sql, [pacienteId]);
        if (result.rowCount === 0) {
            return res.status(404).send("Paciente no encontrado.");
        }
        res.status(200).send(`El paciente con ID ${pacienteId} fue eliminado con éxito.`);
    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        res.status(500).send("Error al eliminar el paciente.");
    }
});

module.exports = router;
