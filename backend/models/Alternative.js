module.exports = (sequelize, DataTypes) => {
  const Alternative = sequelize.define('Alternative', {
    pergunta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Question',
        key: 'id',
      },
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'alternativas',   
    timestamps: false,          
  });

  Alternative.associate = (models) => {
    Alternative.belongsTo(models.Question, { foreignKey: 'pergunta_id' });
  };

  return Alternative;
};
