const KeywordModel  = require( '../models/keywordmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class KeywordLogic {

    static async create(keyword)
    {
        let result = this.validateCreate(keyword);
        if(result.success){
            try {
                let newkeyword = await KeywordModel.create(keyword);
                result.payload = newkeyword;
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
            let keywords  = await KeywordModel.findAll({
                order:[
                    ['id', 'DESC']
                ]
            })
            return { success: true, payload: keywords }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let keywords  = await KeywordModel.findAll({
                where: {
                    [Op.or] : [
                        {wordID: { [Op.like] : '%' + search.wordID + '%' }},
                        {wordEN: { [Op.like] : '%' + search.wordEN + '%' }}
                    ]

                }
            })
            return { success: true, payload: keywords }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let keyword  = await KeywordModel.findByPk(id);

            return { success: true, payload: clone }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  keyword)
    {
        let result = this.validate(keyword);
        if(result.success){
            try {
                let newkeyword = await KeywordModel.update(keyword, { where:  { id: id }  });
                result.payload = newkeyword;
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

            let result = await KeywordModel.destroy({ where: { id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(keyword){
        
        return this.validate(keyword);
    }

    static validate(keyword)
    {   
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = KeywordLogic;