module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    User.associate = (models) => {
      User.hasMany(models.Expense, {
        foreignKey: 'userId',
        as: 'expenses',
      });
    };
  
    return User;
  };
  