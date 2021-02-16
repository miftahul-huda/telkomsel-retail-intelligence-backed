const { Model, DataTypes } = require('sequelize');

class SubOperatorModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            sub_operator_name: DataTypes.STRING,
            sub_operator_logo: DataTypes.TEXT,
            operator_id : DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'suboperator', tableName: 'suboperator', force: force });
    }
}

module.exports = SubOperatorModel;