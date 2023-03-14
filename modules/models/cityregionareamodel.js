const { Model, DataTypes } = require('sequelize');

class CityRegionAreaModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            city: DataTypes.STRING,
            region: DataTypes.STRING,
            area: DataTypes.STRING,
        }, 
        { sequelize, modelName: 'cityregionarea', tableName: 'cityregionarea', timestamps: false, force: force });
    }
}

module.exports = CityRegionAreaModel;