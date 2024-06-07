'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    return queryInterface.createTable('category', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('category');
  }
};
