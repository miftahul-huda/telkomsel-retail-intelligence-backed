const CitySRPModel  = require( '../models/citysrpmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const StoreModel = require('../models/storemodel');
const UploadFileModel = require('../models/uploadfilemodel');
const Initialization = require("../../initialization")

class CitySRPLogic {

    static async findByPackageNameAndOutlet(packageName, outletid)
    {
        try{
            let store = await StoreModel.findOne({
                where: {
                    storeid : outletid
                }
            });

            let city = null;
            if(store != null)
            {
                city = store.store_city;
            }
            /*
            console.log("outletid")
            console.log(outletid)

            console.log("city")
            console.log(city)
            */
            if(city != null)
            {
                let package_name = packageName.replace(/\s/gi, "");
                let cityspr  = await CitySRPModel.findOne({
                    where: {
                        [Op.and]:
                        [
                            {city : {[Op.iLike]: "" + city + "" }},
                            { columnWithFunction: Sequelize.where(Sequelize.fn("REPLACE", Sequelize.col("packageName"), " ", ""), "ilike", package_name )} 
                        ]
                    }
                })
                return { success: true, payload: cityspr }
            }
            else
                return { success: true, payload: null}

        }
        catch (error)
        {
            console.log(error);
            throw { success: false, message: '', error: error };
        }
    }

    static async processSalesRecommendedPrice(dt1, dt2)
    {
        try {

            let sequelize = Initialization.getSequelize();
            let items = await sequelize.query("select u.*, p.id as posterItemId, p.packageName from uploadfile u where u.upload_date between '" + dt1 + "' and '" + dt2 + "' inner join posteritem p on u.id = p.upload_file_id")
            items.map((item)=>{
                
            })
            
        } catch (error) {
            console.log(error);
            throw { success: false, message: '', error: error };
        }
    }
}

module.exports = CitySRPLogic;