const CitySRPModel  = require( '../models/citysrpmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const StoreModel = require('../models/storemodel');


class CitySRPLogic {

    static async findByPackageNameAndOutlet(packageName, outletid)
    {
        try{
            let store = await StoreModel.findOne({
                storeid : outletid
            });

            let city = null;
            if(store != null)
            {
                city = store.store_city;
            }
            if(city != null)
            {
                let package_name = packageName.replace(/\s/gi, "");
                let cityspr  = await CitySRPModel.findOne({
                    where: {
                        [Op.and]:
                        [
                            {city : {[Op.iLike]: city }},
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
}

module.exports = CitySRPLogic;