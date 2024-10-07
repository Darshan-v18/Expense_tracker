module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      receipt: {
        type: DataTypes.STRING,
      },
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
      date: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
        defaultValue: DataTypes.NOW,  
      }
    });
  
    Expense.associate = (models) => {
      Expense.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Expense.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
    };
  
    return Expense;
  };
  