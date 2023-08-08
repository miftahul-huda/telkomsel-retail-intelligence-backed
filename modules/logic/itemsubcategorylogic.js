const ItemSubCategoryModel  = require( '../models/itemsubcategorymodel')
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Initialization = require('../../initialization');
const UploadFileModel = require('../models/uploadfilemodel');

class ItemSubCategoryLogic {


    static async create(itemSubCategory)
    {
        delete itemSubCategory.id;
        itemSubCategory.id = null;
        let result = this.validateCreate(itemSubCategory);
        if(result.success){
            try {
                itemSubCategory.isTransfered = 0;
                let newitemSubCategory = await ItemSubCategoryModel.create(itemSubCategory);
                //newUploadFile = this.clear(uploadfile)
                result.payload = newitemSubCategory;
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
            let itemSubCategorys  = await ItemSubCategoryModel.findAll()
            return { success: true, payload: itemSubCategorys }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByFileId(fileid)
    {
        try{
            let itemSubCategorys  = await ItemSubCategoryModel.findAll({
                where: {
                    upload_file_id : fileid
                }
            })
            return { success: true, payload: itemSubCategorys }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async get(id)
    {
        try{
            let itemSubCategory  = await ItemSubCategoryModel.findByPk(id );
            return { success: true, payload: itemSubCategory }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  itemSubCategory)
    {
        let result = this.validateCreate(itemSubCategory);
        if(result.success){
            try {
                let item = await ItemSubCategoryModel.update(itemSubCategory, { where:  { id: id }  });
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
            let result = await ItemSubCategoryModel.destroy({ where: { id: id} });
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async deleteByUploadId(id)
    {
        try{

            let result = await ItemSubCategoryModel.destroy({ where: { upload_file_id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static validateCreate(itemSubCategory)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = ItemSubCategoryLogic;