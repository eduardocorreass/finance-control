module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('expense', {
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
            type: DataTypes.INTEGER,
            references: {
            model: 'category',
            key: 'name'
        },
            allowNull: false
        }
    }, {
        tableName: 'expense',
        timestamps: true
    });

    Expense.associate = function(models) {
        Expense.belongsTo(models.category, {
            foreignKey: 'category_id',
            as: 'category'
        });
    };

    return Expense;
}
