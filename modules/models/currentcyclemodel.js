const { Model, DataTypes } = require('sequelize');

class CurrentCycleModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            cycleID: DataTypes.STRING,
            cycleTitle: DataTypes.STRING,
            cycleStartDate: DataTypes.DATE,
            cycleEndDate: DataTypes.DATE,
            isActive: DataTypes.INTEGER,        }, 
        { sequelize, modelName: 'currentcycle', tableName: 'currentcycle', force: force });
    }
}

module.exports = CurrentCycleModel;