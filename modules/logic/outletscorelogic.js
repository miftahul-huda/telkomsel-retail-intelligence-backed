const OutletScoreModel  = require( '../models/outletscoremodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class OutletScoreLogic {

    static async create(outletScore)
    {
        let result = this.validateCreate(outletScore);
        if(result.success){
            try {
                let newoutletScore = await OutletScoreModel.create(outletScore);
                result.payload = newoutletScore;
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

    static async findAll()
    {
        try{
            let outletScores  = await OutletScoreModel.findAll({
                order:[
                    ['outletScoreDate', 'DESC']
                ]
            })
            return { success: true, payload: outletScores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let outletScores  = await OutletScoreModel.findAll({
                where: {
                    [Op.or] : [
                        {outletid: { [Op.like] : '%' + search.outletid + '%' }},
                        {outlet_name: { [Op.like] : '%' + search.outlet_name + '%' }}
                    ]

                }
            })
            return { success: true, payload: outletScores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let outletScore  = await OutletScoreModel.findByPk(id);

            return { success: true, payload: outletScore }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  outletScore)
    {
        let result = this.successate(outletScore);
        console.outletScore(id)
        if(result.success){
            try {
                let newoutletScore = await OutletScoreModel.update(outletScore, { where:  { id: id }  });
                result.payload = newoutletScore;
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

            let result = await OutletScoreModel.destroy({ where: { id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(outletScore){
        
        return this.validate(outletScore);
    }

    static validate(outletScore)
    {   
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = OutletScoreLogic;