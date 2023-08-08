const PackageNameModel  = require( '../models/packagenamemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

class PackageNameLogic {

    static async findAll(operator)
    {
        console.log(operator)
        try{

            let where = {
                where: {
                    operator : operator
                }
            };

            if(operator == "*")
                where = {};
            
            let packages  = await PackageNameModel.findAll(where)
            return { success: true, payload: packages }
        }
        catch (error)
        {
            console.log(error);
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword)
    {
        try{
            let packages  = await PackageNameModel.findAll({
                where: {
                    [Op.or] : [
                        {package_name: { [Op.like] : '%' + keyword + '%' }}
                    ]
                }
            })
            return { success: true, payload: packages  }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let pack = await PackageNameModel.findByPk(id)
            return { success: true, payload: pack }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

}

module.exports = PackageNameLogic;