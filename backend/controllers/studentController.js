const Student = require('../models/Student');
const Answer = require('../models/Answer');

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });
    
    res.json(student);
  } catch (error) {
    console.error("Erro ao buscar aluno: ", error);  
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};

exports.getStudentPerformance = async (req, res) => {
  const { id } = req.params;
  
  try {
    const performance = await Answer.findAll({ where: { aluno_id: id } });
    
    res.json(performance);
  } catch (error) {
    console.error("Erro ao buscar o desempenho do aluno:", error);  
    res.status(500).json({ error: 'Erro ao buscar desempenho do aluno' });
  }
};
