const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.File = require('./file.model')(sequelize, DataTypes);
db.Block = require('./block.model')(sequelize, DataTypes);

// Relationship
db.File.hasMany(db.Block, { foreignKey: 'fileId', onDelete: 'CASCADE' });
db.Block.belongsTo(db.File, { foreignKey: 'fileId' });

module.exports = db;
