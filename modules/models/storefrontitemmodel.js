const { Model, DataTypes } = require('sequelize');

class StoreFrontItemModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            operator:  DataTypes.STRING,
            operatorText: DataTypes.STRING,
            percentage: DataTypes.DECIMAL,
            upload_file_id: DataTypes.INTEGER,
            /*
            productHero: DataTypes.STRING,
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
            */
            isTransfered: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'storefrontitem', tableName: 'storefrontitem', force: force });
    }
}

module.exports = StoreFrontItemModel;