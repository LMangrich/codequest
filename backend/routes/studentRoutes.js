const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.get('/:id', studentController.getStudentById);
router.get('/:id/performance', studentController.getStudentPerformance);

module.exports = router;
