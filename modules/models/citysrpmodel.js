const { Model, DataTypes } = require('sequelize');

class CitySRPModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            city: DataTypes.STRING,
            packageName: DataTypes.STRING,
            quota: DataTypes.DECIMAL,
            srp: DataTypes.DECIMAL
        }, 
        { sequelize, modelName: 'citysrp', tableName: 'citysrp', force: force });
    }
}

module.exports = CitySRPModel;