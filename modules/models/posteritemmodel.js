const { Model, DataTypes } = require('sequelize');

class PosterItemModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            denome:  DataTypes.STRING,
            denomeText:  DataTypes.STRING,
            packageName: DataTypes.STRING,
            quotaGb: DataTypes.DECIMAL,
            activeDays: DataTypes.DECIMAL,
            transferPrice: DataTypes.DECIMAL,
            endUserPrice: DataTypes.DECIMAL,
            upload_file_id: DataTypes.INTEGER,

        }, 
        { sequelize, modelName: 'posteritem', tableName: 'posteritem', force: force });
    }
}

module.exports = PosterItemModel;