const { Model, DataTypes } = require('sequelize');

class PackageNameModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            package_name: DataTypes.STRING,
            operator: DataTypes.STRING,
            quota: DataTypes.DECIMAL
        }, 
        { sequelize, modelName: 'packagename', tableName: 'packagename', force: force });
    }
}

module.exports = PackageNameModel;