const { Model, DataTypes } = require('sequelize');

class NotificationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
            data: DataTypes.TEXT,
            username: DataTypes.STRING,
            readers: DataTypes.TEXT,
            readDate: DataTypes.DATE,
            isActive: DataTypes.INTEGER,
            tag: DataTypes.STRING
        }, 
        { sequelize, modelName: 'notification', tableName: 'notification', force: force });
    }
}

module.exports = NotificationModel;