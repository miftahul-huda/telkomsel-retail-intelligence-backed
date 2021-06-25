const { Model, DataTypes } = require('sequelize');

class ItemSubCategoryTypeModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            subCategoryType: DataTypes.STRING,
            description: DataTypes.STRING,
            iconUrl: DataTypes.STRING,
            itemSubCategoryId: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'itemsubcategorytype', tableName: 'itemsubcategorytype', force: force });
    }
}

module.exports = ItemSubCategoryTypeModel;