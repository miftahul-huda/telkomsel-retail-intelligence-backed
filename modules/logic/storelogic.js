const StoreModel  = require( '../models/storemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class StoreLogic {

    static async findAll(area)
    {
        try{
            let where = {};
            if(area != null)
                where = {  store_area: { [Op.iLike] : area } }

            let stores  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('storeid')), 'storeid'], 'store_name', 'store_area', 'store_city'],
                where: where,
                limit: 30
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllByCity(city)
    {
        try{
            let where = {};
            if(city != null)
                where = {  store_city: { [Op.iLike] : city } }

            let stores  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('storeid')), 'storeid'], 'store_name', 'store_city', 'store_area'],
                where: where,
                limit: 30
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllCity()
    {
        try{

            let cities  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('store_city')), 'city']]
            });

            return { success: true, payload: cities }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllArea()
    {
        try{

            let areas  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('store_area')), 'area']]
            });

            return { success: true, payload: areas }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllNoLimit(area)
    {
        try{
            let where = {};
            if(area != null)
                where = {  store_area: { [Op.iLike] : area } }

            let stores  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('storeid')), 'storeid'], 'store_name', 'store_area', 'store_city'],
                where: where
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllNoLimitByCity(city)
    {
        try{
            let where = {};
            if(city != null)
                where = {  store_city: { [Op.iLike] : city } }

            let stores  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('storeid')), 'storeid'], 'store_name', 'store_city', 'store_area'],
                where: where
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword, area)
    {
        try{
            let where = {
                [Op.or] : [
                    {store_name: { [Op.iLike] : '%' + keyword + '%' }},
                    {storeid: { [Op.iLike] : '%' + keyword + '%' }}
                ]
            };

            if(area != null)
            {
                where = {
                    [Op.and] : [
                        where,
                        {store_area: { [Op.iLike] : area }}   
                    ]
                }
            }

            let stores  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('storeid')), 'storeid'], 'store_name', 'store_area', 'store_city'],
                where: where,
                limit: 30
            });


            return { success: true, payload: stores  }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeywordByCity(keyword, city)
    {
        try{
            let where = {
                [Op.or] : [
                    {store_name: { [Op.iLike] : '%' + keyword + '%' }},
                    {storeid: { [Op.iLike] : '%' + keyword + '%' }}
                ]
            };

            if(city != null)
            {
                where = {
                    [Op.and] : [
                        where,
                        {store_city: { [Op.iLike] : city }}   
                    ]
                }
            }

            let stores  = await StoreModel.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('storeid')), 'storeid'], 'store_name', 'store_city', 'store_area'],
                where: where,
                limit: 30
            });


            return { success: true, payload: stores  }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let store    = await StoreModel.findByPk(id);
            return { success: true, payload: store }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async create(store)
    {
        let result = this.validateCreate(store);
        if(result.success){
            try {
                
                let newStore = await StoreModel.create(store);
                console.log(newStore);
                //newUser = this.clear(user)
                result.payload = newStore;
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

    static async delete(id)
    {
        try{
            let result = await StoreModel.destroy({
                where: {
                    id: id
                }
            });
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(store)
    {
        if(store.store_name == null || store.store_name.trim().length == 0)
            return { success: false, message: 'Please enter store name' }

        return { success: true, message: '' }
    }

}

module.exports = StoreLogic;