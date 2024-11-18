const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');

require('./config/db'); 

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
