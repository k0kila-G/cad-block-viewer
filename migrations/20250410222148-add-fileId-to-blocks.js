
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Blocks', 'fileId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Files', // name of the target table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Blocks', 'fileId');
  }
};
