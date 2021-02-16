const StoreModel  = require( '../models/storemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class StoreLogic {

    static async findAll()
    {
        try{
            let stores  = await StoreModel.findAll({
                limit: 30
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword)
    {
        try{
            let stores  = await StoreModel.findAll({
                where: {
                    [Op.or] : [
                        {store_name: { [Op.like] : '%' + keyword + '%' }}
                    ]
                },
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