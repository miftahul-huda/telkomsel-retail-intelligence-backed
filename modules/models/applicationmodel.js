const { Model, DataTypes } = require('sequelize');

class ApplicationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            appname: DataTypes.STRING,
            appdescription: DataTypes.STRING,
            clientid: DataTypes.STRING,
            clientsecret: DataTypes.STRING,
            callbackurl: DataTypes.STRING,
            createdAt: DataTypes.DATE
        }, 
        { sequelize, modelName: 'application', tableName: 'application', force: force });
    }
}

module.exports = ApplicationModel;