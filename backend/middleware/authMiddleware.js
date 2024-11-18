const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar se o usuário está autenticado
exports.authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Confirma se o usuário ainda existe no banco de dados
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
};

// Middleware para verificar se o usuário é um professor
exports.isTeacher = (req, res, next) => {
  if (req.user.tipo !== 'professor') {
    return res.status(403).json({ error: 'Acesso restrito a professores.' });
  }
  next();
};

// Middleware para verificar se o usuário é um aluno
exports.isStudent = (req, res, next) => {
  if (req.user.tipo !== 'aluno') {
    return res.status(403).json({ error: 'Acesso restrito a alunos.' });
  }
  next();
};
