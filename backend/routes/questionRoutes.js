const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

router.get("/author/:id", questionController.getQuestionsByAuthorId);
router.post("/", questionController.createQuestion);

module.exports = router;
