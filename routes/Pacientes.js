const express = require("express");
const router = express.Router();
const Paciente = require("../models/Paciente");

const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("nombre").notEmpty().withMessage("El nombre es obligatorio."),
    check("apellido").notEmpty().withMessage("El apellido es obligatorio."),
    check("cedula").notEmpty().withMessage("La cédula es obligatoria."),
    check("email").isEmail().withMessage("Debe ser un correo válido."),
    check("telefono").notEmpty().withMessage("El teléfono es obligatorio."),
    check("fechaNacimiento").isDate().withMessage("Debe ser una fecha válida."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    try {
      const paciente = await Paciente.create(req.body);
      res.status(201).json(paciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Crear un paciente
/*router.post("/", async (req, res) => {
    try {
        const paciente = await Paciente.create(req.body);
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});*/

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
/*router.put("/:id", async (req, res) => {
    try {
        const paciente = await Paciente.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Paciente actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});*/
router.put("/:id", async (req, res) => {
    try {
        const [rowsUpdated] = await Paciente.update(req.body, { where: { id: req.params.id } });
        if (!rowsUpdated) return res.status(404).json({ error: "Paciente no encontrado" });

        const updatedPaciente = await Paciente.findByPk(req.params.id);
        res.status(200).json(updatedPaciente);
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
