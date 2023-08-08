const FilePackageSubItemModel  = require( '../models/filepackagesubitemmodel')
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Initialization = require('../../initialization');
const UploadFileModel = require('../models/uploadfilemodel');


class FilePackageSubItemLogic {


    static async create(filePackageSubItem)
    {
        delete filePackageSubItem.id;
        filePackageSubItem.id = null;
        let result = this.validateCreate(filePackageSubItem);
        if(result.success){
            try {
                filePackageSubItem.isTransfered = 0;
                let newfilePackageSubItem = await FilePackageSubItemModel.create(filePackageSubItem);

                //newUploadFile = this.clear(uploadfile)
                result.payload = newfilePackageSubItem;
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
            let filePackageSubItems  = await FilePackageSubItemModel.findAll()
            return { success: true, payload: filePackageSubItems }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByIsTransfered(isTransfered)
    {
        try{
            let sequelize = Initialization.getSequelize();
            let query = "SELECT filepackageitem.*, uploadfile.*, uploadfile.id  " + 
            "FROM filepackageitem inner join " +
            "uploadfile on filepackageitem.upload_file_id = uploadfile.id " +
            "where " +
            "\"uploadfile\".\"isTransfered\" = " + isTransfered;
            let filePackageSubItems  = await sequelize.query(query, { type: QueryTypes.SELECT });
            
            /*await FilePackageSubItemModel.findAll({
                where: {
                    isTransfered: isTransfered
                }
            })*/
            return { success: true, query: query,  payload: filePackageSubItems, total: filePackageSubItems.length }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static async findByPackageItemId(packageItemId)
    {
        try{
            let filePackageSubItems  = await FilePackageSubItemModel.findAll({
                where: {
                    packageItemId : packageItemId
                }
            })
            return { success: true, payload: filePackageSubItems }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async get(id)
    {
        try{
            let filePackageSubItem  = await FilePackageSubItemModel.findByPk(id );
            return { success: true, payload: filePackageSubItem }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  filePackageSubItem)
    {
        let result = this.validateCreate(filePackageSubItem);
        if(result.success){
            try {
                let item = await FilePackageSubItemModel.update(filePackageSubItem, { where:  { id: id }  });
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


    static async updateIsTransfered(ids,  isTransfered)
    {
        let result = { success: true, error: null, payload: null }
        try {
            let sIds = ids.split(',');
            for(var i = 0; i < sIds.length; i++)
                sIds[i] = parseInt(sIds[i])

            let uploadFiles = await UploadFileModel.update({ isTransfered : isTransfered }, { where:  { id: {[Op.in]:  sIds} }});


            result.payload = uploadFiles;
            return  result;
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async delete(id)
    {
        try{
            let result = await FilePackageSubItemModel.destroy({ where: { id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async deleteByPackageItemId(id)
    {
        try{

            let result = await FilePackageSubItemModel.destroy({ where: { packageItemId: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static validateCreate(filePackageSubItem)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = FilePackageSubItemLogic;