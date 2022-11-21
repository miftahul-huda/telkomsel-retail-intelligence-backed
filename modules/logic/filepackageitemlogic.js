const FilePackageItemModel  = require( '../models/filepackageitemmodel')
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Initialization = require('../../initialization');
const UploadFileModel = require('../models/uploadfilemodel');
const FilePackageSubItemModel = require('../models/filepackagesubitemmodel');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class FilePackageItemLogic {

    static async createFilePackageSubItem(subItem)
    {
        let promise = new Promise((resolve, reject) => {
            FilePackageSubItemModel.create(subItem).then((newSubItem)=>{
                resolve(newSubItem)
            }).catch((err)=>{
                reject(err);
            })
        })

        return promise;
    }

    static async create(filePackageItem)
    {
        delete filePackageItem.id;
        filePackageItem.id = null;
        let result = this.validateCreate(filePackageItem);
        if(result.success){
            try {
                filePackageItem.isTransfered = 0;
                let newfilePackageItem = await FilePackageItemModel.create(filePackageItem);

                if(filePackageItem.packageSubItems != null && filePackageItem.packageSubItems.length > 0)
                {
                    filePackageItem.packageSubItems.map(async (subItem)=>{
                        subItem.id = null;
                        subItem.packageItemId  = newfilePackageItem.id;
                        await FilePackageItemLogic.createFilePackageSubItem(subItem);
                    })
                }

                //newUploadFile = this.clear(uploadfile)
                result.payload = newfilePackageItem;
                return  result;
            }
            catch(error)
            {
                console.log("Error FilePackageItemLogic.create")
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
            let filePackageItems  = await FilePackageItemModel.findAll()
            return { success: true, payload: filePackageItems }
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
            let filePackageItems  = await sequelize.query(query, { type: QueryTypes.SELECT });
            
            /*await FilePackageItemModel.findAll({
                where: {
                    isTransfered: isTransfered
                }
            })*/
            return { success: true, query: query,  payload: filePackageItems, total: filePackageItems.length }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static async findByFileId(fileid)
    {
        try{
            let filePackageItems  = await FilePackageItemModel.findAll({
                where: {
                    upload_file_id : fileid
                }
            })
            return { success: true, payload: filePackageItems }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async get(id)
    {
        try{
            let filePackageItem  = await FilePackageItemModel.findByPk(id );
            return { success: true, payload: filePackageItem }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  filePackageItem)
    {
        let result = this.validateCreate(filePackageItem);
        if(result.success){
            try {
                let item = await FilePackageItemModel.update(filePackageItem, { where:  { id: id }  });
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
            let result = await FilePackageItemModel.destroy({ where: { id: id } });
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
            let packageItems = await FilePackageItemModel.findAll({ where: { upload_file_id: id }});
            let packageItemIds = [];
            packageItems.map((item)=>{
                packageItemIds.push(item.id)
            })
            let result = await FilePackageItemModel.destroy({ where: { upload_file_id: id }});
            if(packageItemIds.length > 0)
                await FilePackageSubItemModel.destroy({ where: { packageItemId: { [Op.in]: packageItemIds } } })
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static validateCreate(filePackageItem)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = FilePackageItemLogic;