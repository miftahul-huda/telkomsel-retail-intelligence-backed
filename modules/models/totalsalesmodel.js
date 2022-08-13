const { Model, DataTypes } = require('sequelize');

class TotalSalesModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            isiUlang: DataTypes.DECIMAL,
            paketPalingBanyakDibeli: DataTypes.STRING,
            paketPalingBanyakDibeliNama: DataTypes.STRING,
            paketPalingBanyakDibeliBesaran: DataTypes.DECIMAL,
            upload_file_id: DataTypes.INTEGER,
            totalRataPenjualan: DataTypes.DECIMAL,
            totalPenjualanPerdana: DataTypes.DECIMAL,
            totalPenjualanVoucherFisik: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaMicro: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaLow: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaMid: DataTypes.DECIMAL,
            totalPenjualanKartuPerdanaHigh: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikMicro: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikLow: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikMid: DataTypes.DECIMAL,
            totalPenjualanVoucherFisikHigh: DataTypes.DECIMAL,
            operator: DataTypes.STRING

        }, 
        { sequelize, modelName: 'totalsales', tableName: 'totalsales', force: force });
    }
}

module.exports = TotalSalesModel;