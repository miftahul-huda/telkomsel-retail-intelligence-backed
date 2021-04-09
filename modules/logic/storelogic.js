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
                where = { store_area: area }

            let stores  = await StoreModel.findAll({
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

    static async findAllArea(area)
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
                where = { store_area: area }

            let stores  = await StoreModel.findAll({
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
                    {store_name: { [Op.like] : '%' + keyword + '%' }},
                    {storeid: { [Op.like] : '%' + keyword + '%' }}
                ]
            };

            if(area != null)
            {
                where = {
                    [Op.and] : [
                        where,
                        {store_area: area}   
                    ]
                }
            }

            let stores  = await StoreModel.findAll({
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