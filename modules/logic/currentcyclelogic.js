const CurrentCycleModel  = require( '../models/currentcyclemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

class CurrentCycleLogic {

    static async findByActive(isActive)
    {
        try{
            let cycles  = await CurrentCycleModel.findOne({
                where: {
                    isActive : isActive
                }
            })

            if(cycles != null)
                return { success: true, payload: cycles }
            else 
                throw { success: false, message: 'Not found' };

        }
        catch (error)
        {
            console.log(error);
            throw { success: false, message: '', error: error };
        }
    }


}

module.exports = CurrentCycleLogic;