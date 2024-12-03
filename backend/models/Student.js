module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      matricula: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_student_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "turmas",
          key: "id",
        },
      },
    },
    {
      tableName: "alunos",
      timestamps: false,
    }
  );

  Student.associate = (models) => {
    Student.belongsTo(models.User, { foreignKey: "usuario_id" });
    Student.belongsTo(models.Class, { foreignKey: "turma_id" });
  };

  return Student;
};
