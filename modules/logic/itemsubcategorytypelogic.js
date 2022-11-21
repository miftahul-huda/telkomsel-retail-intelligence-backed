const ItemSubCategoryTypeModel  = require( '../models/itemsubcategorytypemodel')
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Initialization = require('../../initialization');
const UploadFileModel = require('../models/uploadfilemodel');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class ItemSubCategoryTypeLogic {


    static async create(itemSubCategoryType)
    {
        delete itemSubCategoryType.id;
        itemSubCategoryType.id = null;
        let result = this.validateCreate(itemSubCategoryType);
        if(result.success){
            try {
                itemSubCategoryType.isTransfered = 0;
                let newitemSubCategoryType = await ItemSubCategoryTypeModel.create(itemSubCategoryType);
                //newUploadFile = this.clear(uploadfile)
                result.payload = newitemSubCategoryType;
                return  result;
            }
            catch(error)
            {
                console.log(error);
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
            let itemSubCategoryTypes  = await ItemSubCategoryTypeModel.findAll()
            return { success: true, payload: itemSubCategoryTypes }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByItemSubCategory(itemSubCategoryId)
    {
        try{
            let itemSubCategoryTypes  = await ItemSubCategoryTypeModel.findAll({
                where: {
                    itemSubCategoryId : itemSubCategoryId
                }
            })
            return { success: true, payload: itemSubCategoryTypes }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async get(id)
    {
        try{
            let itemSubCategoryType  = await ItemSubCategoryTypeModel.findByPk(id );
            return { success: true, payload: itemSubCategoryType }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  itemSubCategoryType)
    {
        let result = this.validateCreate(itemSubCategoryType);
        if(result.success){
            try {
                let item = await ItemSubCategoryTypeModel.update(itemSubCategoryType, { where:  { id: id }  });
                result.payload = item;
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

            let result = await ItemSubCategoryTypeModel.destroy({ where: { id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async deleteByItemSubCategoryId(itemSubCategoryId)
    {
        try{

            let result = await ItemSubCategoryTypeModel.destroy({ where: { itemSubCategoryId: itemSubCategoryId }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static validateCreate(itemSubCategoryType)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = ItemSubCategoryTypeLogic;