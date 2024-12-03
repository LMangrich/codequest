module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    professor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "professores",
        key: "id",
      },
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modo_aleatorio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Teacher, { foreignKey: "professor_id" });
  };

  return Quiz;
};
