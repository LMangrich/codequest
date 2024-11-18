module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    enunciado: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nivel_dificuldade: {
      type: DataTypes.ENUM('iniciantes', 'intermediario', 'avancado'),
      allowNull: false,
    },
    respondida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    inicio_resposta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'perguntas',  
    timestamps: false,       
  });

  return Question;
};
