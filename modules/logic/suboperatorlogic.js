const SubOperatorModel  = require( '../models/suboperatormodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class CityLogic {

    static async findAll(operator_id)
    {
        try{
            let suboperators  = await SubOperatorModel.findAll({
                where: {
                    operator_id : operator_id
                }
            })
            return { success: true, payload: suboperators }
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
            let suboperators  = await SubOperatorModel.findAll({
                where: {
                    [Op.or] : [
                        {sub_operator_name: { [Op.like] : '%' + keyword + '%' }}
                    ]
                }
            })
            return { success: true, payload: suboperators  }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let suboperator    = await SubOperatorModel.findByPk(id)
            return { success: true, payload: suboperator }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

}

module.exports = CityLogic;