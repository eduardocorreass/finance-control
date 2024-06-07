module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define('income', {
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
        tableName: 'income',
        timestamps: true
    });

    Income.associate = function(models) {
        Income.belongsTo(models.category, {
            foreignKey: 'category_id',
            as: 'category'
        });
    };

    return Income;
}
