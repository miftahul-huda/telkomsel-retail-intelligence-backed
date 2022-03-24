const EtalaseItemModel  = require( '../models/etalaseitemmodel')
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Initialization = require('../../initialization');
const UploadFileModel = require('../models/uploadfilemodel');


class EtalaseItemLogic {


    static async create(fileEtalaseItem)
    {
        delete fileEtalaseItem.id;
        fileEtalaseItem.id = null;
        let result = this.validateCreate(fileEtalaseItem);
        if(result.success){
            try {
                fileEtalaseItem.isTransfered = 0;
                let newfileEtalaseItem = await EtalaseItemModel.create(fileEtalaseItem);
                console.log(newfileEtalaseItem);
                //newUploadFile = this.clear(uploadfile)
                result.payload = newfileEtalaseItem;
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
            let fileEtalaseItems  = await EtalaseItemModel.findAll()
            return { success: true, payload: fileEtalaseItems }
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
            const fileEtalaseItems = await sequelize.query("SELECT etalaseitem.*, uploadfile.*, uploadfile.id  FROM etalaseitem inner join " +
            "uploadfile on etalaseitem.upload_file_id = uploadfile.id " +
            "where " +
            "\"uploadfile\".\"isTransfered\" = " + isTransfered, { type: QueryTypes.SELECT, raw: true });

            

            /*let fileEtalaseItems  = await EtalaseItemModel.findAll({
                where: {
                    isTransfered: isTransfered
                }
            })*/
            return { success: true, payload: fileEtalaseItems }
        }
        catch (error)
        {
            console.log("ERROR")
            console.log(error);
            throw { success: false, message: '', error: error };
        }
    }


    static async findByFileId(fileid)
    {
        console.log(fileid)
        try{
            let fileEtalaseItems  = await EtalaseItemModel.findAll({
                where: {
                    upload_file_id : fileid
                }
            })

            console.log("fileEtalaseItems")
            console.log(fileEtalaseItems)
            return { success: true, payload: fileEtalaseItems }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async get(id)
    {
        try{
            let fileEtalaseItem  = await EtalaseItemModel.findByPk(id );
            return { success: true, payload: fileEtalaseItem }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  fileEtalaseItem)
    {
        let result = this.validateCreate(fileEtalaseItem);
        console.log(id)
        if(result.success){
            try {
                let item = await EtalaseItemModel.update(fileEtalaseItem, { where:  { id: id }  });
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

            let uploadFiles = await UploadFileModel.update({ isTransfered : isTransfered }, { where:  { id: {[Op.in] : sIds }}});
            
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

            let result = await EtalaseItemModel.destroy({ where: { id: id }});
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

            let result = await EtalaseItemModel.destroy({ where: { upload_file_id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(fileEtalaseItem)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = EtalaseItemLogic;