const express = require("express");
const router = express.Router();
const Medico = require("../models/Medico");

router.post("/", async (req, res) => {
    try {
        const medico = await Medico.create(req.body);
        res.status(201).json(medico);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const medicos = await Medico.findAll();
        res.status(200).json(medicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const medico = await Medico.findByPk(req.params.id);
        if (!medico) return res.status(404).json({ error: "Médico no encontrado" });
        res.status(200).json(medico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const medico = await Medico.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Médico actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Medico.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Médico eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
