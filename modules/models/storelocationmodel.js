const { Model, DataTypes } = require('sequelize');

class StoreLocationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            area: DataTypes.STRING,
            region: DataTypes.STRING,
            branch: DataTypes.STRING,
            cluster: DataTypes.STRING,
            city: DataTypes.STRING,
            district: DataTypes.STRING,
            village: DataTypes.STRING,
        }, 
        { sequelize, modelName: 'storelocation', tableName: 'storelocation', timestamps: false, force: force });
    }
}

module.exports = StoreLocationModel;