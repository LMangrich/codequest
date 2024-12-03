const express = require("express");
const classController = require("../controllers/classController");
const router = express.Router();

router.post("/create", classController.createClass);
router.get("/user/:authorId", classController.getClassByAuthorId);
router.get("/:id/performance", classController.getClassPerformance);

module.exports = router;
