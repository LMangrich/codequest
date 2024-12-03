module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      enunciado: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      nivel_dificuldade: {
        type: DataTypes.ENUM("iniciantes", "intermediario", "avancado"),
        allowNull: false,
      },
      respondida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      inicio_resposta: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      professor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "professores",
          key: "id",
        },
      },
    },
    {
      tableName: "perguntas",
      timestamps: false,
    }
  );

  return Question;
};
