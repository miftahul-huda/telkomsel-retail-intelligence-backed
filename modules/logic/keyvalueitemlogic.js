const KeyValueItemModel  = require( '../models/keyvalueitemmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

class KeyValueItemLogic {

    static async findAll(tag)
    {
        try{
            let where = {};
            if(tag != null)
                where = { tag: tag }

            let items  = await KeyValueItemModel.findAll({
                where: where,
                limit: 30
            });
            return { success: true, payload: items }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static async get(id)
    {
        try{
            let store    = await KeyValueItemModel.findByPk(id);
            return { success: true, payload: store }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async create(keyvalueitem)
    {
        let result = this.validateCreate(keyvalueitem);
        if(result.success){
            try {
                
                let newKeyValue = await KeyValueItemModel.create(keyvalueitem);
                console.log(newKeyValue);
                //newUser = this.clear(user)
                result.payload = newKeyValue;
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
            let result = await KeyValueItemModel.destroy({
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

    static validateCreate(keyvalueitem)
    {

        return { success: true, message: '' }
    }

}

module.exports = KeyValueItemLogic;