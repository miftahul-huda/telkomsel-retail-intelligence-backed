const { Model, DataTypes } = require('sequelize');

class ItemSubCategoryModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            itemSubCategory: DataTypes.STRING,
            description: DataTypes.STRING,
            iconUrl: DataTypes.STRING
        }, 
        { sequelize, modelName: 'itemsubcategory', tableName: 'itemsubcategory', force: force });
    }
}

module.exports = ItemSubCategoryModel;