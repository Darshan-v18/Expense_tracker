module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    });
  
    Category.associate = (models) => {
      Category.hasMany(models.Expense, {
        foreignKey: 'categoryId',
        as: 'expenses',
        onDelete: 'SET NULL',
      });
    };
  
    return Category;
  };
  