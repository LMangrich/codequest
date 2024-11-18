const express = require('express');
const quizController = require('../controllers/quizController');
const router = express.Router();

router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);

module.exports = router;
