const { Question, Quiz, Phase } = require("../config/db");

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.json(quizzes);
  } catch (error) {
    console.error("Erro ao buscar quizzes: ", error);
    res.status(500).json({ error: "Erro ao buscar quizzes" });
  }
};

exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByPk(id, { include: Phase });
    if (!quiz) return res.status(404).json({ error: "Quiz não encontrado" });

    res.json(quiz);
  } catch (error) {
    console.error("Erro ao buscar quiz: ", error);
    res.status(500).json({ error: "Erro ao buscar quiz" });
  }
};

exports.getQuizzesByClassId = async (req, res) => {
  const { classId } = req.params;

  try {
    const quizzes = await Quiz.findAll({ where: { class_id: classId } });
    res.json(quizzes);
  } catch (error) {
    console.error("Erro ao buscar quizzes por classId: ", error);
    res.status(500).json({ error: "Erro ao buscar quizzes por classId" });
  }
};

exports.createQuiz = async (req, res) => {
  const { name, classId, questions, isRandom, profId } = req.body;

  try {
    let selectedQuestions = questions;

    if (isRandom) {
      const allQuestions = await Question.findAll();
      selectedQuestions = allQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    }

    const newQuiz = await Quiz.create({
      professor_id: profId,
      titulo: name,
      class_id: classId,
      modo_aleatorio: isRandom,
    });

    for (const question of selectedQuestions) {
      await newQuiz.addQuestion(question.id);
    }

    res.status(201).json({ message: "Quiz criado com sucesso", quiz: newQuiz });
  } catch (error) {
    console.error("Erro ao criar quiz: ", error);
    res.status(500).json({ error: "Erro ao criar quiz" });
  }
};
