const express = require("express");
const quizController = require("../controllers/quizController");
const router = express.Router();

router.get("/", quizController.getAllQuizzes);
router.get("/:id", quizController.getQuizById);
router.get("/class/:classId", quizController.getQuizzesByClassId);
router.post("/create", quizController.createQuiz);

module.exports = router;
