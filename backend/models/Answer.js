module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    aluno_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'alunos',
        key: 'id',
      },
    },
    pergunta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'perguntas',
        key: 'id',
      },
    },
    fase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'fases',
        key: 'id',
      },
    },
    horario_resposta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    acertou: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tempo_gasto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeout_excedido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'respostas',   
    timestamps: false,       
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Student, { foreignKey: 'aluno_id' });
    Answer.belongsTo(models.Question, { foreignKey: 'pergunta_id' });
    Answer.belongsTo(models.Phase, { foreignKey: 'fase_id' });
  };

  return Answer;
};
