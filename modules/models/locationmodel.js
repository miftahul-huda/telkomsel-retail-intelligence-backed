const { Model, DataTypes } = require('sequelize');

class LocationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            province: DataTypes.STRING,
            cityType: DataTypes.STRING,
            city: DataTypes.STRING,
            district: DataTypes.STRING,
            village: DataTypes.STRING,
            postalCode: DataTypes.STRING,
            isActive: DataTypes.INTEGER,
        }, 
        { sequelize, modelName: 'location', tableName: 'location', force: force });
    }
}

module.exports = LocationModel;