const { Model, DataTypes } = require('sequelize');

class KeywordModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            key: DataTypes.STRING,
            wordID: DataTypes.TEXT,
            wordEN: DataTypes.TEXT,
        }, 
        { sequelize, modelName: 'keyword', tableName: 'keyword', force: force });
    }
}

module.exports = KeywordModel;