module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      professor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "professores",
          key: "id",
        },
      },
      active_quizzes: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "turmas",
      timestamps: false,
    }
  );

  Class.associate = (models) => {
    Class.belongsTo(models.Teacher, { foreignKey: "professor_id" });
    Class.hasMany(models.Student, { foreignKey: "turma_id" });
    Class.hasMany(models.Quiz, { foreignKey: "turma_id" });
  };

  return Class;
};
