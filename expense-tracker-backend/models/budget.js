module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Budget.associate = (models) => {
      Budget.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Budget.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    };
  
    return Budget;
  };
  