const FilePackageItemModel  = require( '../models/filepackageitemmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class FilePackageItemLogic {


    static async create(filePackageItem)
    {
        delete filePackageItem.id;
        filePackageItem.id = null;
        let result = this.validateCreate(filePackageItem);
        if(result.success){
            try {
                filePackageItem.isTransfered = 0;
                let newfilePackageItem = await FilePackageItemModel.create(filePackageItem);
                console.log(newfilePackageItem);
                //newUploadFile = this.clear(uploadfile)
                result.payload = newfilePackageItem;
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
            let filePackageItems  = await FilePackageItemModel.findAll({
                where: {
                    isTransfered: isTransfered
                }
            })
            return { success: true, payload: filePackageItems }
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
                    upload_file_id : {
                        [Op.like] : fileid
                    }
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
        console.log(id)
        if(result.success){
            try {
                let filePackageItem = await FilePackageItemModel.update(filePackageItem, { where:  { id: id }  });
                result.payload = filePackageItem;
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

            let filePackageItems = await FilePackageItemModel.update({ isTransfered : isTransfered }, { where:  { id: sIds }});
            
            result.payload = filePackageItems;
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
            let filePackageItem  = await FilePackageItemModel.findByPk(id);
            let result = await FilePackageItemModel.destroy(filePackageItem);
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