module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define('Otp', {
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      }
    });
  
    Otp.associate = (models) => {
      Otp.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
  
    return Otp;
  };
  