module.exports = (sequelize, DataTypes) => {
  const ClassStudent = sequelize.define(
    "ClassStudent",
    {
      class_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "turmas",
          key: "id",
        },
      },
      student_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "alunos",
          key: "id",
        },
      },
    },
    {
      tableName: "class_students",
      timestamps: false,
    }
  );

  return ClassStudent;
};
