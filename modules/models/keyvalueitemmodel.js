const { Model, DataTypes } = require('sequelize');

class KeyValueItemModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            key: DataTypes.STRING,
            value: DataTypes.STRING,
            tag: DataTypes.STRING,
            isActive: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'keyvalueitem', tableName: 'keyvalueitem', force: force });
    }
}

module.exports = KeyValueItemModel;