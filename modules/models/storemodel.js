const { Model, DataTypes } = require('sequelize');

class StoreModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            storeid: DataTypes.STRING,
            store_name: DataTypes.STRING,
            store_address: DataTypes.STRING,
            store_city: DataTypes.STRING,
            store_province: DataTypes.STRING,
            store_lon:  DataTypes.DECIMAL,
            store_lat: DataTypes.DECIMAL,
            classification: DataTypes.STRING
        }, 
        { sequelize, modelName: 'store', tableName: 'store', force: force });
    }
}

module.exports = StoreModel;