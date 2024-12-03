const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

router.get("/:id", questionController.getQuestionsByAuthorId);
router.post("/", questionController.createQuestion);

module.exports = router;
