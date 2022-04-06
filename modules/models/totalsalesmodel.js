const { Model, DataTypes } = require('sequelize');

class TotalSalesModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            isiUlang: DataTypes.STRING,
            paketPalingBanyakDibeli: DataTypes.STRING,
            upload_file_id: DataTypes.INTEGER,
            totalRataPenjualan: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaMicro: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaLow: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaMid: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaHigh: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikMicro: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikLow: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikMid: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikHigh: DataTypes.DECIMAL,

        }, 
        { sequelize, modelName: 'totalsales', tableName: 'totalsales', force: force });
    }
}

module.exports = TotalSalesModel;