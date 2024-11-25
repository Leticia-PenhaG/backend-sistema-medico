const express = require("express");
const router = express.Router();
const pool = require("../server"); 

// Crear una ficha clínica
router.post("/", async (req, res) => {
    const { paciente_id, medico_id, motivo, diagnostico, tratamiento } = req.body;

    if (!paciente_id || !medico_id || !motivo || !diagnostico || !tratamiento) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    const sql = `
        INSERT INTO Fichas (paciente_id, medico_id, motivo, diagnostico, tratamiento)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    try {
        const resultado = await pool.query(sql, [paciente_id, medico_id, motivo, diagnostico, tratamiento]);
        res.status(201).json({ mensaje: "Ficha clínica registrada.", ficha: resultado.rows[0] });
    } catch (error) {
        console.error("Error al crear ficha clínica:", error);
        res.status(500).send("Error al crear ficha clínica.");
    }
});

// Obtener todas las fichas
router.get("/", async (req, res) => {
    const sql = `
        SELECT F.*, P.nombre AS paciente_nombre, P.apellido AS paciente_apellido,
               M.nombre AS medico_nombre, M.apellido AS medico_apellido
        FROM Fichas F
        JOIN Pacientes P ON F.paciente_id = P.id
        JOIN Medicos M ON F.medico_id = M.id`;

    try {
        const resultado = await pool.query(sql);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener fichas:", error);
        res.status(500).send("Error al obtener fichas.");
    }
});

// Eliminar una ficha
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Fichas WHERE id = $1 RETURNING *";

    try {
        const resultado = await pool.query(sql, [id]);
        if (resultado.rowCount === 0) return res.status(404).send("Ficha no encontrada.");
        res.status(200).send("Ficha eliminada.");
    } catch (error) {
        console.error("Error al eliminar ficha clínica:", error);
        res.status(500).send("Error al eliminar ficha clínica.");
    }
});

module.exports = router;
