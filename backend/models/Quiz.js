module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    professor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'professores',
        key: 'id',
      },
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivel_dificuldade: {
      type: DataTypes.ENUM('iniciantes', 'intermediario', 'avancado'),
      allowNull: false,
    },
    modo_aleatorio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Teacher, { foreignKey: 'professor_id' });
  };

  return Quiz;
};
