module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "Teacher",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
    },
    {
      tableName: "professores",
      timestamps: false,
    }
  );

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.User, { foreignKey: "usuario_id" });
  };

  return Teacher;
};
