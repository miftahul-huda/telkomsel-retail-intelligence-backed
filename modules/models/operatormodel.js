const { Model, DataTypes } = require('sequelize');

class OperatorModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            operator_name: DataTypes.STRING,
            operator_value: DataTypes.STRING,
            operator_logo: DataTypes.TEXT,
            color: DataTypes.STRING,
            ordering: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'operator', tableName: 'operator', force: force });
    }
}

module.exports = OperatorModel;