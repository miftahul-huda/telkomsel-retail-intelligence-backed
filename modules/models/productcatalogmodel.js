const { Model, DataTypes } = require('sequelize');

class ProductCatalogModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            operator: DataTypes.STRING,
            packageType: DataTypes.STRING,
            packageName: DataTypes.STRING,
            validity: DataTypes.STRING,
            channel: DataTypes.STRING,
            price: DataTypes.DECIMAL,
            nationalQuota: DataTypes.DECIMAL,
            localQuota: DataTypes.DECIMAL,
            midnightQuota: DataTypes.DECIMAL,
            gb4gQuota: DataTypes.DECIMAL,
            appsQuota: DataTypes.DECIMAL

        }, 
        { sequelize, modelName: 'productcatalog', tableName: 'productcatalog', force: force });
    }
}

module.exports = ProductCatalogModel;