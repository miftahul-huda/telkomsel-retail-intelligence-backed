const { Model, DataTypes } = require('sequelize');

class FilePackageItemModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            package_name: DataTypes.STRING,
            upload_file_id: DataTypes.INTEGER,
            gbmain: DataTypes.DECIMAL,
            gbmain_duration_days: DataTypes.INTEGER,
            gbnight: DataTypes.DECIMAL,
            gb4glte: DataTypes.DECIMAL,
            gb3g2g: DataTypes.DECIMAL,
            gblocal: DataTypes.DECIMAL,
            gbnational: DataTypes.DECIMAL,
            gbinclvoice: DataTypes.DECIMAL,
            gbincludetext: DataTypes.DECIMAL,
            gbapps: DataTypes.DECIMAL,
            price: DataTypes.DECIMAL,
            validity: DataTypes.DECIMAL,
            transferPrice: DataTypes.DECIMAL,
            category: DataTypes.STRING,
            campaignTheme: DataTypes.STRING,
            isTransfered: DataTypes.INTEGER,
            itemCategory: DataTypes.STRING,
            itemCategoryText: DataTypes.STRING,
            tempid: DataTypes.STRING,
            subitempackage: DataTypes.STRING,
            subitempackageitems: DataTypes.STRING
        }, 
        { sequelize, modelName: 'filepackageitem', tableName: 'filepackageitem', force: force });
    }
}

module.exports = FilePackageItemModel;