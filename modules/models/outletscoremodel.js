const { Model, DataTypes } = require('sequelize');

class OutletScoreModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            outletid: DataTypes.STRING,
            outlet_name: DataTypes.STRING,
            outlet_score: DataTypes.DECIMAL,
            scoring_type: DataTypes.STRING,
            upload_file_id: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'outletscore', tableName: 'outletscore', force: force });
    }
}

module.exports = OutletScoreModel;