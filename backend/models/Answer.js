module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
    {
      aluno_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "alunos",
          key: "id",
        },
      },
      pergunta_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "perguntas",
          key: "id",
        },
      },
      fase_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "fases",
          key: "id",
        },
      },
      horario_resposta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
      acertou: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
        allowNull: true,
      },
      tempo_gasto: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
      timeout_excedido: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      tableName: "respostas",
      timestamps: false,
    }
  );

  Answer.associate = (models) => {
    Answer.belongsTo(models.Student, { foreignKey: "aluno_id" });
    Answer.belongsTo(models.Question, { foreignKey: "pergunta_id" });
    Answer.belongsTo(models.Phase, { foreignKey: "fase_id" });
  };

  return Answer;
};
