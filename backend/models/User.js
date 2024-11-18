module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('professor', 'aluno'),
      allowNull: false,
    },
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });

  return User;  
};
