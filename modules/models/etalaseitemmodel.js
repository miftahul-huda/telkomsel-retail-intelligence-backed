const { Model, DataTypes } = require('sequelize');

class EtalaseItemModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            operator:  DataTypes.STRING,
            operatorText: DataTypes.STRING,
            percentage: DataTypes.DECIMAL,
            upload_file_id: DataTypes.INTEGER,
            isTransfered: DataTypes.INTEGER,
            availability_score: DataTypes.INTEGER,
            availability_percentage: DataTypes.DECIMAL,
            visibility_score: DataTypes.INTEGER,
            visibility_percentage: DataTypes.DECIMAL,
            originalOperator: DataTypes.STRING,
            originalOperatorText: DataTypes.STRING,
            original_availability_percentage: DataTypes.DECIMAL,
            original_visibility_percentage: DataTypes.DECIMAL,
            original_availability_score: DataTypes.DECIMAL,
            original_visibility_score: DataTypes.DECIMAL,

        }, 
        { sequelize, modelName: 'etalaseitem', tableName: 'etalaseitem', force: force });
    }
}

module.exports = EtalaseItemModel;