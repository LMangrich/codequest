module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "usuarios", // Referência ao modelo 'User'
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
    },
    {
      tableName: "alunos",
      timestamps: false,
    }
  );

  Student.associate = (models) => {
    Student.belongsTo(models.User, { foreignKey: "usuario_id" });
  };

  return Student;
};
