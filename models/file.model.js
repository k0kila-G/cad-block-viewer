module.exports = (sequelize, DataTypes) => {
    return sequelize.define('File', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploadDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  };
  