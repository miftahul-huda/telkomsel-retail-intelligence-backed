const UserModel  = require( './modules/models/usermodel')
const ApplicationModel  = require( './modules/models/applicationmodel')
const UserApplicationModel  = require( './modules/models/userapplicationmodel')
const CountryAndCityModel  = require( './modules/models/countryandcitymodel')
const OperatorModel  = require( './modules/models/operatormodel')
const SubOperatorModel  = require( './modules/models/suboperatormodel')
const PackageModel  = require( './modules/models/packagemodel')
const StoreModel  = require( './modules/models/storemodel')
const UploadFileModel  = require( './modules/models/uploadfilemodel')
const FilePackageItemModel  = require( './modules/models/filepackageitemmodel')
const StoreFrontItemModel  = require( './modules/models/storefrontitemmodel')
const LogModel  = require( './modules/models/logmodel')

const { Sequelize, Model, DataTypes } = require('sequelize');



const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: 'postgresql'  
});

class Initialization {

    static getSequelize()
    {
        return sequelize;
    }

    static async initializeDatabase(){

        let force = false;

        CountryAndCityModel.initialize(sequelize);

        UserModel.initialize(sequelize, force);

        LogModel.initialize(sequelize, force);

        ApplicationModel.initialize(sequelize, force);

        UserApplicationModel.initialize(sequelize, force);

        SubOperatorModel.initialize(sequelize, force);

        OperatorModel.initialize(sequelize, force);
        

        PackageModel.initialize(sequelize,force);

        StoreModel.initialize(sequelize, force);

        UploadFileModel.initialize(sequelize, force);

        FilePackageItemModel.initialize(sequelize, force);

        StoreFrontItemModel.initialize(sequelize, force);
 
        UserModel.belongsTo(CountryAndCityModel, { foreignKey: 'cityId' })

        //SubOperatorModel.belongsTo(OperatorModel, { foreignKey: 'operator_id' } )

        //PackageModel.belongsTo(OperatorModel, { foreignKey: 'operator_id' } )

        //FilePackageItemModel.belongsTo(UploadFileModel, {foreignKey: 'upload_file_id' })

        //StoreFrontItemModel.belongsTo(UploadFileModel, {foreignKey: 'upload_file_id' })


        await sequelize.sync();


        //ApplicationModel.belongsToMany(UserModel, { through: UserApplicationModel } )
    }
}

module.exports = Initialization


