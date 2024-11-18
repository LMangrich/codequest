const Teacher = require('../models/Teacher');
const Quiz = require('../models/Quiz');

exports.getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });
    
    res.json(teacher);
  } catch (error) {
    console.error("Erro ao buscar professor: ", error);  
    res.status(500).json({ error: 'Erro ao buscar professor' });
  }
};

exports.createQuiz = async (req, res) => {
  const { professor_id, titulo, nivel_dificuldade, modo_aleatorio } = req.body;
  
  try {
    const newQuiz = await Quiz.create({ professor_id, titulo, nivel_dificuldade, modo_aleatorio });
    
    res.status(201).json({ message: 'Quiz criado com sucesso', quiz: newQuiz });
  } catch (error) {
    console.error("Erro ao criar quiz: ", error);  
    res.status(500).json({ error: 'Erro ao criar quiz' });
  }
};
