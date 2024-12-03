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
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Teacher, { foreignKey: "professor_id" });
    Quiz.hasMany(models.Class, { foreignKey: "turma_id" });
  };

  return Quiz;
};
