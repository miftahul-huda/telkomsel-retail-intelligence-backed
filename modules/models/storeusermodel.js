const { Model, DataTypes } = require('sequelize');

class StoreUserModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            storeid: DataTypes.STRING,
            store_name: DataTypes.STRING,
            username: DataTypes.STRING,
            sfcode: DataTypes.STRING        }, 
        { sequelize, modelName: 'store_user', tableName: 'store_user', force: force });
    }
}

module.exports = StoreUserModel;