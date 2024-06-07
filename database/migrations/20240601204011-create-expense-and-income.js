'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable('income', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
        description: {
        type: DataTypes.STRING,
        allowNull: true
      },
        amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
        date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      category_id: {
        type: DataTypes.STRING,
          references: {
          model: 'category',
          key: 'name'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('expense', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
        description: {
        type: DataTypes.STRING,
        allowNull: true
      },
        amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
        date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      category_id: {
        type: DataTypes.STRING,
        references: {
          model: 'category',
          key: 'name'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('income');
    await queryInterface.dropTable('expense');
  }
};
