const { Class, Student, ClassStudent } = require("../config/db");

exports.createClass = async (req, res) => {
  const { nome, professorId, students } = req.body;

  try {
    const newClass = await Class.create({
      nome,
      professor_id: professorId,
    });

    for (const student of students) {
      await ClassStudent.create({
        class_id: newClass.id,
        student_id: student,
      });
    }

    res
      .status(201)
      .json({ message: "Turma criada com sucesso", class: newClass });
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    res.status(500).json({ error: "Erro ao criar turma" });
  }
};

exports.getClassByAuthorId = async (req, res) => {
  const { id } = req.params;

  try {
    const classes = await Class.findAll({ where: { professor_id: id } });
    res.json(classes);
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    res.status(500).json({ error: "Erro ao buscar turmas" });
  }
};

exports.getClassPerformance = async (req, res) => {
  const { id } = req.params;

  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
};
