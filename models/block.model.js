module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Block', {
      name: {
        type: DataTypes.STRING,
      },
      x: {
        type: DataTypes.FLOAT,
      },
      y: {
        type: DataTypes.FLOAT,
      },
      type: {
        type: DataTypes.STRING,
      },
    });
  };
  