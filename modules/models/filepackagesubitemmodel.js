const { Model, DataTypes } = require('sequelize');

class FilePackageSubItemModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            subItemCategory: DataTypes.STRING,
            subItemCategoryId: DataTypes.STRING,
            quotaType: DataTypes.STRING,
            quotaTypeId: DataTypes.STRING,
            appType: DataTypes.STRING,
            appName: DataTypes.STRING,
            quota: DataTypes.DECIMAL,
            quotaCategory: DataTypes.STRING,
            fup: DataTypes.DECIMAL,
            quotaValidity: DataTypes.DECIMAL,
            validityType: DataTypes.STRING,
            quotaUsage: DataTypes.STRING,
            additionalNote: DataTypes.STRING,
            packageItemId: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'filepackagesubitem', tableName: 'filepackagesubitem', force: force });
    }
}

module.exports = FilePackageSubItemModel;