const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.createQuestion = async (req, res) => {
  const { enunciado, nivel_dificuldade, alternativas } = req.body;
  
  try {
    const newQuestion = await Question.create({ enunciado, nivel_dificuldade });

    for (const alt of alternativas) {
      await Answer.create({ pergunta_id: newQuestion.id, texto: alt.texto, correta: alt.correta });
    }

    res.status(201).json({ message: 'Pergunta criada com sucesso', question: newQuestion });
  } catch (error) {
    console.error("Erro ao criar pergunta:", error);  
    res.status(500).json({ error: 'Erro ao criar pergunta' });
  }
};
