module.exports = (sequelize, DataTypes) => {
  const Phase = sequelize.define('Phase', {
    quiz_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizzes',
        key: 'id',
      },
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fase_concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pontuacao: {
      type: DataTypes.INTEGER,
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
  }, {
    tableName: 'fases',    
    timestamps: false,     
  });

  Phase.associate = (models) => {
    Phase.belongsTo(models.Quiz, { foreignKey: 'quiz_id' });
  };

  return Phase;
};
