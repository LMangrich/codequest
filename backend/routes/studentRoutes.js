const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.get("/:id", studentController.getStudentById);
router.get("/not-in-class/:turma_id", studentController.getStudentsNotInClass);
router.get("/", studentController.getAllStudents);
router.get("/:id/performance", studentController.getStudentPerformance);

module.exports = router;
