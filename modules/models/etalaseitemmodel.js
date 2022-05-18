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
            visibility_score: DataTypes.INTEGER,
            visibility_percentage: DataTypes.DECIMAL
        }, 
        { sequelize, modelName: 'etalaseitem', tableName: 'etalaseitem', force: force });
    }
}

module.exports = EtalaseItemModel;