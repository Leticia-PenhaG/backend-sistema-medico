const express = require("express");
const router = express.Router();
const Paciente = require("../models/Paciente");

// Crear un paciente
router.post("/", async (req, res) => {
    try {
        const paciente = await Paciente.create(req.body);
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los pacientes
router.get("/", async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un paciente por ID
router.get("/:id", async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un paciente
router.put("/:id", async (req, res) => {
    try {
        const paciente = await Paciente.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Paciente actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un paciente
router.delete("/:id", async (req, res) => {
    try {
        await Paciente.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Paciente eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
