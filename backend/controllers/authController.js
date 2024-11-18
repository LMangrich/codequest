const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../config/db'); 

exports.register = async (req, res) => {
  const { email, senha, nome, tipo } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'E-mail já cadastrado' });

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await User.create({ email, senha: hashedPassword, nome, tipo });
    
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);  
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

    // Gera um token JWT
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error("Erro ao realizar o login:", error);  
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
