const express = require('express');
const cors = require('cors');
const postgresPool = require('pg').Pool;

const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new postgresPool({
    user: "postgres",
    password: "12345678",
    database: "sistema_medico",
    host: "localhost",
    port: 5432,
    max: 10,
});

pool.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
        process.exit(1); // Finaliza si hay un error crítico
    }
    console.log("Conexión exitosa a la base de datos 'sistema_medico'.");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// --- Endpoints ---

// Obtener todos los pacientes
app.get("/pacientes", async (req, res) => {
    const sql = "SELECT * FROM pacientes";
    try {
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al obtener pacientes:", error);
        res.status(500).send("Error al obtener la lista de pacientes.");
    }
});

// Obtener un paciente por ID
app.get("/pacientes/:id", async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);

    if (isNaN(pacienteId)) {
        return res.status(400).send("El ID debe ser un número válido.");
    }

    const sql = "SELECT * FROM pacientes WHERE id = $1";
    try {
        const result = await pool.query(sql, [pacienteId]);
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
app.post("/pacientes", async (req, res) => {
    const { nombre, apellido, cedula, email, telefono, fechaNacimiento } = req.body;

    if (!nombre || !apellido || !cedula || !email || !telefono || !fechaNacimiento) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    const sql = `
        INSERT INTO pacientes (nombre, apellido, cedula, email, telefono, fechaNacimiento)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    try {
        const result = await pool.query(sql, [nombre, apellido, cedula, email, telefono, fechaNacimiento]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear el paciente:", error);
        res.status(500).send("Error al crear el paciente.");
    }
});


// Actualizar un paciente por ID
app.patch("/pacientes/:id", async (req, res) => {
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
        const result = await pool.query(sql, [nombre, apellido, cedula, email, telefono, fechaNacimiento, pacienteId]);
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
app.delete("/pacientes/:id", async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);

    if (isNaN(pacienteId)) {
        return res.status(400).send("El ID debe ser un número válido.");
    }

    const sql = "DELETE FROM pacientes WHERE id = $1 RETURNING *";
    try {
        const result = await pool.query(sql, [pacienteId]);
        if (result.rowCount === 0) {
            return res.status(404).send("Paciente no encontrado.");
        }
        res.status(200).send(`El paciente con ID ${pacienteId} fue eliminado con éxito.`);
    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        res.status(500).send("Error al eliminar el paciente.");
    }
});