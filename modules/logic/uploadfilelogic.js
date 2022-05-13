const UploadFileModel  = require( '../models/uploadfilemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const FilePackageItemLogic = require('./filepackageitemlogic');
const StoreFrontItemLogic = require('./storefrontitemlogic')
const TotalSalesModel = require('../models/totalsalesmodel')
const EtalaseItemModel = require('../models/etalaseitemmodel')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class UploadFileLogic {

    static async createPackageItems(packageItems)
    {
        packageItems.map(async (item)=>{
            let newItem = await FilePackageItemLogic.create(item);
            
        })
    }


    static async createStoreFrontItems(storeFrontItems)
    {
        storeFrontItems.map(async (item)=>{
            await StoreFrontItemLogic.create(item);
        })
    }

    static getCurrentDate()
    {
        var date = new Date();
        var dateString = date.getFullYear() + "-" + (date.getMonth()  + 1) + "-" + date.getDate();
        dateString += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return dateString;
    }

    static async create(uploadfile)
    {

        delete uploadfile.id;
        uploadfile.id = null;

        console.log("Receiving uploadfile")
        console.log(uploadfile)

        let result = this.validate(uploadfile);
        if(result.success){
            try {
                uploadfile.isTransfered = 0;
                uploadfile.imageStatus = "uploaded"
                //uploadfile.upload_date = this.getCurrentDate();

                let newUploadFile = await UploadFileModel.create(uploadfile);
                console.log("=======newUploadFile======")
                console.log(newUploadFile);
                console.log("id")
                console.log(newUploadFile.id)
                console.log("================")



                if(uploadfile.packageItems != null && uploadfile.packageItems.length > 0)
                {
                    uploadfile.packageItems.forEach((item)=>{
                        item.upload_file_id  = newUploadFile.id;
                    })
                    await UploadFileLogic.createPackageItems(uploadfile.packageItems);
                }

                if(uploadfile.storeFrontItems != null && uploadfile.storeFrontItems.length > 0)
                {
                    uploadfile.storeFrontItems.forEach((item)=>{
                        item.upload_file_id  = newUploadFile.id;
                    })
                    await UploadFileLogic.createStoreFrontItems(uploadfile.storeFrontItems);
                }

                if(uploadfile.etalaseItems != null)
                {
                    let etalaseItems = uploadfile.etalaseItems;
                    etalaseItems.forEach((item)=>{
                        delete item.id;
                        item.upload_file_id  = newUploadFile.id;
                    })
                    let newEtalaseItems = await EtalaseItemModel.bulkCreate(etalaseItems)
                    newUploadFile.etalaseItems = newEtalaseItems
                }

                if(uploadfile.totalSales != null)
                {
                    let totalSales = uploadfile.totalSales;
                    totalSales.forEach((item)=>{
                        delete item.id;
                        item.upload_file_id  = newUploadFile.id;
                    })
                    let newTotalSales = await TotalSalesModel.bulkCreate(totalSales)
                    newUploadFile.totalSales = newTotalSales
                }

                //newUploadFile = this.clear(uploadfile)
                result.payload = newUploadFile;
                return  result;
            }
            catch(error)
            {
                console.log("error.uploadFileLogic.create");
                console.log(error)
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
            let uploadfiles  = await UploadFileModel.findAll()
            return { success: true, payload: uploadfiles }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByIsTransfered(isTransfered)
    {
        try{
            let uploadfiles  = await UploadFileModel.findAll({
                where: {
                    isTransfered : isTransfered
                }
            })
            return { success: true, payload: uploadfiles }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    

    static async findByEmail(email)
    {
        try{
            let uploadfiles  = await UploadFileModel.findAll({
                where: {
                    uploaded_by_email : {
                        [Op.like] : email
                    }
                },
                order:[['id', 'desc'] ]
            })
            return { success: true, payload: uploadfiles }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword)
    {
        try{
            let uploadfiles  = await UploadFileModel.findAll({
                where: {
                    [Op.or] : [
                        {email: { [Op.like] : '%' + keyword + '%' }},
                        {firstname: { [Op.like] : '%' + keyword + '%' }},
                        {lastname: { [Op.like] :'%' + keyword + '%'}},
                    ]

                }
            })
            return { success: true, payload: uploadfiles }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let uploadfile  = await UploadFileModel.findByPk(id);
            return { success: true, payload: uploadfile }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async getByBeforeAfterID(id)
    {
        try{
            let uploadfile  = await UploadFileModel.findAll({ where: { beforeAfterID: id } });
            return { success: true, payload: uploadfile }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  uploadfile)
    {
        let result = this.validateUpdate(uploadfile);
        console.log(id)
        if(result.success){
            try {
                let newUploadFile = await UploadFileModel.update(uploadfile, { where:  { id: id }  });
                newUploadFile =  { uploadfilename: newUploadFile.uploadfilename, firstname: newUploadFile.firstname, lastname: newUploadFile.lastname,  mail: newUploadFile.mail, id: newUploadFile.id }
                result.payload = newUploadFile;
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
        var result = { success: true, error: null, payload: null }
        try {
            let sIds = ids.split(',');
            for(var i = 0; i < sIds.length; i++)
                sIds[i] = parseInt(sIds[i])
            console.log(sIds)

            let newUploadFile = await UploadFileModel.update({ isTransfered : isTransfered }, { where:  { id: sIds }});
            
            result.payload = newUploadFile;
            return  result;
        }
        catch(error)
        {
            console.log("error")
            console.log(error)
            throw { success: false, message: '', error: error };
        }
    }

    static async delete(id)
    {
        try{

            let result = await UploadFileModel.destroy({ where: { id: id }});
            await FilePackageItemLogic.deleteByUploadId(id);
            await StoreFrontItemLogic.deleteByUploadId(id);
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static validate(uploadfile)
    {
        let result = {success :  true, message: "Succesfull"};
        if(uploadfile.imageCategory.indexOf("poster") > -1)
        {
            if(uploadfile.packageItems == null || uploadfile.packageItems.length == 0)
            {
                result = { success: false, message: 'Mohon isi item-item paket'  }
            }
        }

        if(uploadfile.imageCategory.indexOf("storefront") > -1)
        {
            if(uploadfile.storeFrontItems == null || uploadfile.storeFrontItems.length == 0)
            {
                result = { success: false, message: 'Mohon isi item-item paket'  }
            }
        }

        if(uploadfile.imageCategory.indexOf("etalase") > -1)
        {
            if(uploadfile.etalaseItems == null || uploadfile.etalaseItems.length == 0)
            {
                result = { success: false, message: 'Mohon isi item-item etalase'  }
            }
        }

        if(uploadfile.imageCategory.indexOf("total-sales") > -1)
        {
            if(uploadfile.totalSales == null || uploadfile.totalSales.length == 0)
            {
                result = { success: false, message: 'Mohon isi item-item total penjualan'  }
            }
        }


        return result;
    }

    static validateUpdate(uploadfile)
    {
        let result = {success :  true, message: "Succesfull"};

        return result;
    }
}

module.exports = UploadFileLogic;