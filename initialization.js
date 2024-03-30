const UserModel  = require( './modules/models/usermodel')
const ApplicationModel  = require( './modules/models/applicationmodel')
const UserApplicationModel  = require( './modules/models/userapplicationmodel')
const CountryAndCityModel  = require( './modules/models/countryandcitymodel')
const OperatorModel  = require( './modules/models/operatormodel')
const SubOperatorModel  = require( './modules/models/suboperatormodel')
const PackageModel  = require( './modules/models/packagemodel')
const PackageNameModel  = require( './modules/models/packagenamemodel')
const StoreModel  = require( './modules/models/storemodel')
const UploadFileModel  = require( './modules/models/uploadfilemodel')
const FilePackageItemModel  = require( './modules/models/filepackageitemmodel')
const FilePackageSubItemModel  = require( './modules/models/filepackagesubitemmodel')
const StoreFrontItemModel  = require( './modules/models/storefrontitemmodel')
const LogModel  = require( './modules/models/logmodel')
const ItemSubCategoryModel  = require( './modules/models/itemsubcategorymodel')
const ItemSubCategoryTypeModel  = require( './modules/models/itemsubcategorytypemodel')
const ProductCatalogModel  = require( './modules/models/productcatalogmodel')
const KeyValueItemModel  = require( './modules/models/keyvalueitemmodel')
const TotalSalesModel  = require( './modules/models/totalsalesmodel')
const EtalaseItemModel  = require( './modules/models/etalaseitemmodel')
const StoreUserModel  = require( './modules/models/storeusermodel')
const PosterItem  = require( './modules/models/posteritemmodel')
const NotificationModel = require("./modules/models/notificationmodel")
const CurrentCycleModel = require("./modules/models/currentcyclemodel")
const OutletScoreModel = require("./modules/models/outletscoremodel")
const LocationModel = require("./modules/models/locationmodel")
const CityRegionAreaModel = require("./modules/models/cityregionareamodel")
const StoreLocationModel = require("./modules/models/storelocationmodel")
const KeywordModel = require("./modules/models/keywordmodel")
const CitySRPModel = require("./modules/models/citysrpmodel")

const { Sequelize, Model, DataTypes } = require('sequelize');
const PosterItemModel = require('./modules/models/posteritemmodel')
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');



class Initialization {

    static getSequelize()
    {
        /*
        const client = new SecretManagerServiceClient();
        let projectId = process.env.GCP_PROJECT_ID;
        let env = process.env.DEPLOYMENT;

        // Access the secret.
        //DBHOST
        let name = `projects/${projectId}/secrets/${env}_DBHOST/versions/latest`;
        let [accessResponse] = await client.accessSecretVersion({
            name: name,
        });
        
        let dbhost = accessResponse.payload.data.toString('utf8');

        //DBNAME
        name = `projects/${projectId}/secrets/${env}_DBNAME/versions/latest`;
        [accessResponse] = await client.accessSecretVersion({
            name: name,
        });
        let dbname = accessResponse.payload.data.toString('utf8');

        //DBUSER
        name = `projects/${projectId}/secrets/${env}_DBUSER/versions/latest`;
        [accessResponse] = await client.accessSecretVersion({
            name: name,
        });
        const dbuser = accessResponse.payload.data.toString('utf8');

        //DBPASSWORD
        name = `projects/${projectId}/secrets/${env}_DBPASSWORD/versions/latest`;
        [accessResponse] = await client.accessSecretVersion({
            name: name,
        });
        const dbpassword = accessResponse.payload.data.toString('utf8');

        */


        let dbname = process.env.DBNAME;
        let dbuser = process.env.DBUSER;
        let dbpassword = process.env.DBPASSWORD;
        let dbhost = process.env.DBHOST;
        console.log("db : " + dbname)
        console.log("db host : " + dbhost)


        const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
            host: dbhost,
            dialect: process.env.DBENGINE,
            logging: false
        });

        return sequelize;
    }

    static async initializeDatabase(){

        let force = false;

        let sequelize =  Initialization.getSequelize();

        CountryAndCityModel.initialize(sequelize);

        UserModel.initialize(sequelize, force);

        LogModel.initialize(sequelize, force);

        ApplicationModel.initialize(sequelize, force);

        UserApplicationModel.initialize(sequelize, force);

        SubOperatorModel.initialize(sequelize, force);

        OperatorModel.initialize(sequelize, force);
        

        PackageModel.initialize(sequelize,force);

        PackageNameModel.initialize(sequelize,force);

        StoreModel.initialize(sequelize, force);

        UploadFileModel.initialize(sequelize, force);

        FilePackageItemModel.initialize(sequelize, force);

        FilePackageSubItemModel.initialize(sequelize, force);

        ItemSubCategoryModel.initialize(sequelize, force);

        ItemSubCategoryTypeModel.initialize(sequelize, force);

        StoreFrontItemModel.initialize(sequelize, force);
 
        UserModel.belongsTo(CountryAndCityModel, { foreignKey: 'cityId' })

        ProductCatalogModel.initialize(sequelize, force);

        KeyValueItemModel.initialize(sequelize, force);

        TotalSalesModel.initialize(sequelize, force);

        EtalaseItemModel.initialize(sequelize, force);

        StoreUserModel.initialize(sequelize, force);

        PosterItemModel.initialize(sequelize, force);

        NotificationModel.initialize(sequelize, force);

        CurrentCycleModel.initialize(sequelize, force);

        OutletScoreModel.initialize(sequelize, force);

        LocationModel.initialize(sequelize, force);

        CityRegionAreaModel.initialize(sequelize, force);

        StoreLocationModel.initialize(sequelize, force);

        KeywordModel.initialize(sequelize, force);

        CitySRPModel.initialize(sequelize, force);


        //SubOperatorModel.belongsTo(OperatorModel, { foreignKey: 'operator_id' } )

        //PackageModel.belongsTo(OperatorModel, { foreignKey: 'operator_id' } )

        //FilePackageItemModel.belongsTo(UploadFileModel, {foreignKey: 'upload_file_id' })

        //StoreFrontItemModel.belongsTo(UploadFileModel, {foreignKey: 'upload_file_id' })


        await sequelize.sync();


        //ApplicationModel.belongsToMany(UserModel, { through: UserApplicationModel } )
    }
}

module.exports = Initialization



