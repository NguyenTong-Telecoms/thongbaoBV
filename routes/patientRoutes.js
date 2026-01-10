const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// ADMIN
router.get('/patients', patientController.listPatients);
router.post('/patients', patientController.createPatient);
router.post('/patients/update/:id', patientController.updatePatient);
router.get('/patients/delete/:id', patientController.deletePatient);
router.get('/patients/export', patientController.exportExcel);

// MÀN HÌNH HIỂN THỊ
router.get('/list', patientController.showList);

// API
router.get('/api/patients', patientController.getPatientsJson);

module.exports = router;
