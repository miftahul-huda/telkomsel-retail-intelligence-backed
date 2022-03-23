const { Model, DataTypes } = require('sequelize');

class TotalSalesModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            kartuPerdana: DataTypes.STRING,
            voucherFisik: DataTypes.STRING,
            isiUlang: DataTypes.STRING,
            paketPalingBanyakDibeli: DataTypes.STRING,
            upload_file_id: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'totalsales', tableName: 'totalsales', force: force });
    }
}

module.exports = TotalSalesModel;