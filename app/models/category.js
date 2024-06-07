module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
        }, {
        tableName: 'category',
        timestamps: false
    });

    Category.associate = function(models) {
        Category.hasMany(models.expense, {
            foreignKey: 'category_id',
            as: 'expenses'
        });
    };

    Category.associate = function(models) {
        Category.hasMany(models.expense, {
            foreignKey: 'category_id',
            as: 'incomes'
        });
    };
    
    return Category;
}