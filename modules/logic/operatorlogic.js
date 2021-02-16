const OperatorModel  = require( '../models/operatormodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class OperatorLogic {

    static async findAll()
    {
        try{
            let operators  = await OperatorModel.findAll();
            return { success: true, payload: operators }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword)
    {
        try{
            let operators  = await OperatorModel.findAll({
                where: {
                    [Op.or] : [
                        {operator_name: { [Op.like] : '%' + keyword + '%' }}
                    ]
                }
            });
            return { success: true, payload: operators  }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let operator    = await OperatorModel.findByPk(id);
            return { success: true, payload: operator }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

}

module.exports = OperatorLogic;