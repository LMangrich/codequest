const { Question, Answer } = require("../config/db");

exports.createQuestion = async (req, res) => {
  const { enunciado, nivel_dificuldade, alternativas, profId } = req.body;

  try {
    const newQuestion = await Question.create({
      enunciado,
      nivel_dificuldade,
      professor_id: profId,
      respondida: false,
    });

    for (const alt of alternativas) {
      await Answer.create({
        pergunta_id: newQuestion.id,
        texto: alt.texto,
        correta: alt.correta,
      });
    }

    res
      .status(201)
      .json({ message: "Pergunta criada com sucesso", question: newQuestion });
  } catch (error) {
    console.error("Erro ao criar pergunta:", error);
    res.status(500).json({ error: "Erro ao criar pergunta" });
  }
};

exports.getQuestionsByAuthorId = async (req, res) => {
  const { id } = req.params;

  try {
    const questions = await Question.findAll({ where: { professor_id: id } });
    res.json(questions);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro ao buscar perguntas" });
  }
};
