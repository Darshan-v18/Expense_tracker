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
          model: 'Users', // This refers to the Users table
          key: 'id',
        },
        onDelete: 'CASCADE', // If the user is deleted, also delete OTP
      }
    });
  
    Otp.associate = (models) => {
      // An OTP belongs to a User
      Otp.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
  
    return Otp;
  };
  