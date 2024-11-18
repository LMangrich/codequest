const Quiz = require('../models/Quiz');
const Phase = require('../models/Phase');

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.json(quizzes);
  } catch (error) {
    console.error("Erro ao buscar quizzes: ", error);  
    res.status(500).json({ error: 'Erro ao buscar quizzes' });
  }
};

exports.getQuizById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const quiz = await Quiz.findByPk(id, { include: Phase });
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });
    
    res.json(quiz);
  } catch (error) {
    console.error("Erro ao buscar quiz: ", error);  
    res.status(500).json({ error: 'Erro ao buscar quiz' });
  }
};
