const PackageNameModel  = require( '../models/packagenamemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class PackageNameLogic {

    static async findAll(operator)
    {
        console.log(operator)
        try{
            let packages  = await PackageNameModel.findAll({
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