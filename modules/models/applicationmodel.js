const { Model, DataTypes } = require('sequelize');

class ApplicationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            appname: DataTypes.STRING,
            appdescription: DataTypes.STRING,
            version: DataTypes.STRING,
            appMessage: DataTypes.STRING,
            appConfig: DataTypes.STRING,
        }, 
        { sequelize, modelName: 'application', tableName: 'application', force: force });
    }
}

module.exports = ApplicationModel;