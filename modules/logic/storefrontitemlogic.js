const StoreFrontItemModel  = require( '../models/storefrontitemmodel')
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Initialization = require('../../initialization');
const UploadFileModel = require('../models/uploadfilemodel');


class StoreFrontItemLogic {


    static async create(fileStoreFrontItem)
    {
        delete fileStoreFrontItem.id;
        fileStoreFrontItem.id = null;
        let result = this.validateCreate(fileStoreFrontItem);
        if(result.success){
            try {
                fileStoreFrontItem.isTransfered = 0;
                let newfileStoreFrontItem = await StoreFrontItemModel.create(fileStoreFrontItem);
                console.log(newfileStoreFrontItem);
                //newUploadFile = this.clear(uploadfile)
                result.payload = newfileStoreFrontItem;
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
            let fileStoreFrontItems  = await StoreFrontItemModel.findAll()
            return { success: true, payload: fileStoreFrontItems }
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
            const fileStoreFrontItems = await sequelize.query("SELECT storefrontitem.*, uploadfile.*, uploadfile.id  FROM storefrontitem inner join " +
            "uploadfile on storefrontitem.upload_file_id = uploadfile.id " +
            "where " +
            "\"uploadfile\".\"isTransfered\" = " + isTransfered, { type: QueryTypes.SELECT, raw: true });

            fileStoreFrontItems

            /*let fileStoreFrontItems  = await StoreFrontItemModel.findAll({
                where: {
                    isTransfered: isTransfered
                }
            })*/
            return { success: true, payload: fileStoreFrontItems }
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
        try{
            let fileStoreFrontItems  = await StoreFrontItemModel.findAll({
                where: {
                    upload_file_id : fileid
                }
            })
            return { success: true, payload: fileStoreFrontItems }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async get(id)
    {
        try{
            let fileStoreFrontItem  = await StoreFrontItemModel.findByPk(id );
            return { success: true, payload: fileStoreFrontItem }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  fileStoreFrontItem)
    {
        let result = this.validateCreate(fileStoreFrontItem);
        console.log(id)
        if(result.success){
            try {
                let item = await StoreFrontItemModel.update(fileStoreFrontItem, { where:  { id: id }  });
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

            let result = await StoreFrontItemModel.destroy({ where: { id: id }});
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

            let result = await StoreFrontItemModel.destroy({ where: { upload_file_id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(fileStoreFrontItem)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = StoreFrontItemLogic;