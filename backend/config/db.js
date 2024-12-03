const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const User = require("../models/User")(sequelize, DataTypes);
const Teacher = require("../models/Teacher")(sequelize, DataTypes);
const Student = require("../models/Student")(sequelize, DataTypes);
const Quiz = require("../models/Quiz")(sequelize, DataTypes);
const Question = require("../models/Question")(sequelize, DataTypes);
const Phase = require("../models/Phase")(sequelize, DataTypes);
const Answer = require("../models/Answer")(sequelize, DataTypes);
const Alternative = require("../models/Alternative")(sequelize, DataTypes);
const Class = require("../models/Class")(sequelize, DataTypes);
const ClassStudent = require("../models/ClassStudent")(sequelize, DataTypes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso");
    return sequelize.sync({ force: false }); // Sincroniza os modelos com o banco
  })
  .then(() => {
    console.log("Banco de dados sincronizado");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

module.exports = {
  sequelize,
  User,
  Teacher,
  Student,
  Quiz,
  Question,
  Phase,
  Answer,
  Alternative,
  Class,
  ClassStudent,
};
