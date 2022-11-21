const TotalSalesModel  = require( '../models/totalsalesmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class TotalSalesLogic {

    static async findAll()
    {
        try{

            let stores  = await TotalSalesModel.findAll({
                limit: 30
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let store    = await TotalSalesModel.findByPk(id);
            return { success: true, payload: store }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async create(totalsales)
    {
        let result = this.validateCreate(totalsales);
        if(result.success){
            try {
                
                let newTotalSales = await TotalSalesModel.create(totalsales);
                //newUser = this.clear(user)
                result.payload = newTotalSales;
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

    static async update(id, totalsales)
    {
        let result = this.validateUpdate(totalsales);
        if(result.success){
            try {
                
                let newTotalSales = await TotalSalesModel.update(totalsales, { 
                    where: {
                        id: id
                    }
                });
                //newUser = this.clear(user)
                result.payload = newTotalSales;
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

    static async findByFileId(fileid)
    {
        try{
            let totalsales  = await TotalSalesModel.findAll({
                where: {
                    upload_file_id : fileid
                }
            })
            return { success: true, payload: totalsales }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static async delete(id)
    {
        try{
            let result = await TotalSalesModel.destroy({
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

    static validateCreate(totalsales)
    {
        return { success: true, message: '' }
    }

    static validateUpdate(totalsales)
    {
        return { success: true, message: '' }
    }

}

module.exports = TotalSalesLogic;