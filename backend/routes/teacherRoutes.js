const express = require('express');
const teacherController = require('../controllers/teacherController');
const router = express.Router();

router.get('/:id', teacherController.getTeacherById);
router.post('/quiz', teacherController.createQuiz);

module.exports = router;
