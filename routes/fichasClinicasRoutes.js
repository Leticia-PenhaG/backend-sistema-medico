const express = require('express');
const router = express.Router();
const { ClinicalRecord, Patient, Doctor } = require('../models'); 

router.get('/clinical-records', async (req, res) => {
  try {
    const records = await ClinicalRecord.findAll({
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' },
      ],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clinical-records/:id', async (req, res) => {
  try {
    const record = await ClinicalRecord.findByPk(req.params.id, {
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' },
      ],
    });

    if (!record) {
      return res.status(404).json({ message: 'Ficha clínica no encontrada' });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/clinical-records', async (req, res) => {
  try {
    const { patientId, doctorId, diagnosis, treatment, appointmentDate } = req.body;

    const newRecord = await ClinicalRecord.create({
      patientId,
      doctorId,
      diagnosis,
      treatment,
      appointmentDate,
    });

    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
