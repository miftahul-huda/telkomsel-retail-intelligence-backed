const StoreUserModel = require( '../models/storeusermodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class StoreUserLogic {


    static async findByUserAndStoreID(user, sfcode, storeid)
    {
        try{


            let cond1 = { [Op.and] : [ { username: {[Op.iLike] : '%' + user + '%' }}, { storeid: {[Op.iLike] : '%' + storeid + '%' }}] }  ;
            let cond2 = { [Op.and] : [ { sfcode: {[Op.iLike] : '%' + sfcode + '%' }}, { storeid: {[Op.iLike] : '%' + storeid + '%' }}] }  ;
            let cond3 = { [Op.and] : [ { sfcode: {[Op.iLike] : '%' + user + '%' }}, { storeid: {[Op.iLike] : '%' + storeid + '%' }}] }  ;
            let cond4 = { [Op.and] : [ { username: {[Op.iLike] : '%' + sfcode + '%' }}, { storeid: {[Op.iLike] : '%' + storeid + '%' }}] }  ;

            let stores  = await StoreUserModel.findAll({
                where: { [Op.or] : [ cond1, cond2, cond3, cond4 ] }  
            });

            let payload = { exists: false }
            if(stores.length > 0)
            {
                payload = { exists: true }
            }

            payload = { exists: true }
            return { success: true, payload: payload }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async create(storeUser)
    {
        let result = {  success: true }
        if(result.success){
            try {
                
                let newStoreUser = await StoreUserModel.create(storeUser);
                console.log(newStoreUser);
                result.payload = newStoreUser;
                return  result;
            }
            catch(error)
            {
                throw { success: false, message: '', error: error };
            }   
        }
        else
        {
            throw result
        }

    }



}

module.exports = StoreUserLogic;