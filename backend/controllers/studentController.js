const { Student, Answer } = require("../config/db");

exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);
    if (!student)
      return res.status(404).json({ error: "Aluno não encontrado" });

    res.json(student);
  } catch (error) {
    console.error("Erro ao buscar aluno: ", error);
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
};

exports.getStudentsNotInClass = async (req, res) => {
  const { turma_id } = req.params;

  try {
    // to do student class model
    const studentsInClass = await StudentClass.findAll({
      where: { turma_id },
      attributes: ["aluno_id"],
    });

    const studentIdsInClass = studentsInClass.map(
      (student) => student.aluno_id
    );

    const studentsNotInClass = await Student.findAll({
      where: {
        id: {
          [Op.notIn]: studentIdsInClass,
        },
      },
    });

    res.json(studentsNotInClass);
  } catch (error) {
    console.error("Erro ao buscar alunos que não estão na turma:", error);
    res
      .status(500)
      .json({ error: "Erro ao buscar alunos que não estão na turma" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error("Erro ao buscar todos os alunos:", error);
    res.status(500).json({ error: "Erro ao buscar todos os alunos" });
  }
};

exports.getStudentPerformance = async (req, res) => {
  const { id } = req.params;

  try {
    const performance = await Answer.findAll({ where: { aluno_id: id } });

    res.json(performance);
  } catch (error) {
    console.error("Erro ao buscar o desempenho do aluno:", error);
    res.status(500).json({ error: "Erro ao buscar desempenho do aluno" });
  }
};
