const { Model, DataTypes } = require('sequelize');

class PackageModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            package_name: DataTypes.STRING,
            operator_id : DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'package', tableName: 'package', force: force });
    }
}

module.exports = PackageModel;