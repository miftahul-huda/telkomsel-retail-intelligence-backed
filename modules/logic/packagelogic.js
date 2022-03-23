const PackageModel  = require( '../models/packagemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class CityLogic {

    static async findAll(operator)
    {
        console.log(operator)
        try{
            let packages  = await PackageModel.findAll({
                where: {
                    operator : operator
                }
            })
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
            let packages  = await PackageModel.findAll({
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
            let pack = await PackageModel.findByPk(id)
            return { success: true, payload: pack }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

}

module.exports = CityLogic;