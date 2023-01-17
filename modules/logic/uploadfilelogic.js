const UploadFileModel  = require( '../models/uploadfilemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const FilePackageItemLogic = require('./filepackageitemlogic');
const StoreFrontItemLogic = require('./storefrontitemlogic')
const TotalSalesModel = require('../models/totalsalesmodel')
const EtalaseItemModel = require('../models/etalaseitemmodel')
const PosterItemModel = require('../models/posteritemmodel');
const OutletScoreModel = require('../models/outletscoremodel');
const ApplicationModel = require('../models/applicationmodel');
const Initialization = require('../../initialization');
const StoreFrontItemModel = require('../models/storefrontitemmodel');
const StoreUserModel = require('../models/storeusermodel');



class UploadFileLogic {

    static async createPackageItems(packageItems)
    {
        packageItems.map(async (item)=>{
            let newItem = await FilePackageItemLogic.create(item);
            
        })
    }

    static async getTotalByEmail(email)
    {
        try
        {
            let total = await UploadFileModel.count({ where: { uploaded_by_email : { [Op.iLike] : "'" + email + "'"} } });
            return { success: true, payload: total};
        }
        catch(err)
        {
            throw {success: false, error: err, message: err.message}
        }
        
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
        let newUploadFile = null;
        let sequelize = Initialization.getSequelize();
        //let t = await sequelize.transaction();


        delete uploadfile.id;
        uploadfile.id = null;

        //console.log("Receiving uploadfile")
        //console.log(uploadfile)

        let result = await this.validate(uploadfile);
        if(result.success){
            try {

                await UploadFileLogic.checkAndCreateOutletForUser(uploadfile.store_id, uploadfile.store_name, uploadfile.uploaded_by_email, uploadfile.sfcode)

                uploadfile.isTransfered = 0;
                uploadfile.imageStatus = "uploaded"
                //uploadfile.upload_date = this.getCurrentDate();

                newUploadFile = await UploadFileModel.create(uploadfile);
                //console.log("=======newUploadFile======")
                //console.log(newUploadFile);
                //console.log("id")
                //console.log(newUploadFile.id)
                //console.log("================")


                if(uploadfile.storeFrontItems != null && uploadfile.storeFrontItems.length > 0)
                {
                    uploadfile.storeFrontItems.forEach((item)=>{
                        item.upload_file_id  = newUploadFile.id;
                        UploadFileLogic.initStoreFrontItem(item);
                    })
                    await UploadFileLogic.createStoreFrontItems(uploadfile.storeFrontItems);
                }

                if(uploadfile.etalaseItems != null)
                {
                    let etalaseItems = uploadfile.etalaseItems;
                    etalaseItems.forEach((item)=>{
                        delete item.id;
                        item.upload_file_id  = newUploadFile.id;
                        UploadFileLogic.initEtalaseItem(item);
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
                        UploadFileLogic.initTotalSales(item);
                    })
                    let newTotalSales = await TotalSalesModel.bulkCreate(totalSales)
                    newUploadFile.totalSales = newTotalSales
                }


                if(uploadfile.posterItems != null)
                {
                    let posterItems = uploadfile.posterItems;
                    posterItems.forEach((item)=>{
                        delete item.id;
                        item.upload_file_id  = newUploadFile.id;
                        UploadFileLogic.initPosterItem(item);
                    })
                    let newposterItems = await PosterItemModel.bulkCreate(posterItems)
                    newUploadFile.posterItems = newposterItems

                    //console.log("new poster items")
                    //console.log(newposterItems)
                }

                if(uploadfile.outletScores != null)
                {
                    let outletScores = uploadfile.outletScores;
                    outletScores.forEach((item)=>{
                        delete item.id;
                        item.upload_file_id  = newUploadFile.id;
                        UploadFileLogic.initOutletScore(item);
                    })
                    let newOutletScores = await OutletScoreModel.bulkCreate(outletScores)
                    newUploadFile.outletScores = outletScores

                    //console.log("new poster items")
                    //console.log(newposterItems)
                }

                //await t.commit();

                //newUploadFile = this.clear(uploadfile)
                result.payload = newUploadFile;
                return  result;
            }
            catch(error)
            {
                //await t.rollback();
                if(newUploadFile != null && newUploadFile.id != null)
                {
                    await UploadFileModel.destroy({ where: { id: newUploadFile.id} });
                    await PosterItemModel.destroy({ where: { upload_file_id: newUploadFile.id } });
                    await EtalaseItemModel.destroy({ where: { upload_file_id: newUploadFile.id } });
                    await StoreFrontItemModel.destroy({ where: { upload_file_id: newUploadFile.id } });
                    await TotalSalesModel.destroy({ where: { upload_file_id: newUploadFile.id } });
                    await OutletScoreModel.destroy({ where: { upload_file_id: newUploadFile.id } });
                }
               
                console.log("error.uploadFileLogic.create");
                console.log(error)
                console.log(uploadfile)
                throw { success: false, message: '', error: error };
            }
            
        }
        else
        {
            console.log("Invalid")
            console.log(result)
            throw result
        }

    }

    static async checkAndCreateOutletForUser(outletid, outletname, username, sfcode)
    {

        try
        {
            let found = await StoreUserModel.findOne({ where: { [Op.and]: { storeid: outletid, sfcode: sfcode}  } });
            if(found == null)
            {
                let newStoreUser = {};
                newStoreUser.storeid = outletid;
                newStoreUser.store_name = outletname;
                newStoreUser.username = username;
                newStoreUser.sfcode = sfcode;
    
                await StoreUserModel.create(newStoreUser);
            }

        }
        catch(e)
        {
            console.log("error.checkAndCreateOutletForUser()")
            console.log(e)
        }

    }

    static initOutletScore(outletScore)
    {
        if(outletScore.outlet_score != null && outletScore.outlet_score.toString().trim() == "")
            outletScore.outlet_score = 0;
        
        return outletScore;
    }

    static initEtalaseItem(etalaseItem)
    {
        if(etalaseItem.percentage != null && etalaseItem.percentage.toString().trim() == "" )
            etalaseItem.percentage = 0;
        if(etalaseItem.availability_score != null && etalaseItem.availability_score.toString().trim() == "" )
            etalaseItem.availability_score = 0;
        if(etalaseItem.visibility_score != null && etalaseItem.visibility_score.toString().trim() == "" )
            etalaseItem.visibility_score = 0;
        if(etalaseItem.visibility_percentage != null && etalaseItem.visibility_percentage.toString().trim() == "" )
            etalaseItem.visibility_percentage = 0;
        if(etalaseItem.original_availability_percentage != null && etalaseItem.original_availability_percentage.toString().trim() == "" )
            etalaseItem.original_availability_percentage = 0;
        if(etalaseItem.original_availability_score != null && etalaseItem.original_availability_score.toString().trim() == "" )
            etalaseItem.original_availability_score = 0;
        if(etalaseItem.original_visibility_score != null && etalaseItem.original_visibility_score.toString().trim() == "" )
            etalaseItem.original_visibility_score = 0;
        if(etalaseItem.availability_percentage != null && etalaseItem.availability_percentage.toString().trim() == "" )
            etalaseItem.availability_percentage = 0;     
            
        return etalaseItem;
    }

    static initPosterItem(posterItem)
    {
        if(posterItem.quotaGb != null && posterItem.quotaGb.toString().trim() == "")
            posterItem.quotaGb = 0;
        if(posterItem.activeDays != null && posterItem.activeDays.toString().trim() == "")
            posterItem.activeDays = 0;
        if(posterItem.transferPrice != null && posterItem.transferPrice.toString().trim() == "")
            posterItem.transferPrice = 0;
        if(posterItem.endUserPrice != null && posterItem.endUserPrice.toString().trim() == "")
            posterItem.endUserPrice = 0;
        
        return posterItem;
    }

    static initStoreFrontItem(storeFrontItem)
    {
        if(storeFrontItem.percentage != null && storeFrontItem.percentage.toString().trim() == "" )
            storeFrontItem.percentage = 0;
        if(storeFrontItem.gbmain != null && storeFrontItem.gbmain.toString().trim() == "" )
            storeFrontItem.gbmain = 0;
        if(storeFrontItem.gbmain_duration_days != null && storeFrontItem.gbmain_duration_days.toString().trim() == "" )
            storeFrontItem.gbmain_duration_days = 0;
        if(storeFrontItem.gbnight != null && storeFrontItem.gbnight.toString().trim() == "" )
            storeFrontItem.gbnight = 0;
        if(storeFrontItem.gb4glte != null && storeFrontItem.gb4glte.toString().trim() == "" )
            storeFrontItem.gb4glte = 0;
        if(storeFrontItem.gb3g2g != null && storeFrontItem.gb3g2g.toString().trim() == "" )
            storeFrontItem.gb3g2g = 0;
        if(storeFrontItem.gblocal != null && storeFrontItem.gblocal.toString().trim() == "" )
            storeFrontItem.gblocal = 0;
        if(storeFrontItem.gbnational != null && storeFrontItem.gbnational.toString().trim() == "" )
            storeFrontItem.gbnational = 0;     
        if(storeFrontItem.gbinclvoice != null && storeFrontItem.gbinclvoice.toString().trim() == "" )
            storeFrontItem.gbinclvoice = 0;     
        if(storeFrontItem.gbincludetext != null && storeFrontItem.gbincludetext.toString().trim() == "" )
            storeFrontItem.gbincludetext = 0;     
        if(storeFrontItem.gbapps != null && storeFrontItem.gbapps.toString().trim() == "" )
            storeFrontItem.gbapps = 0;     
        if(storeFrontItem.price != null && storeFrontItem.price.toString().trim() == "" )
            storeFrontItem.price = 0;     
        if(storeFrontItem.validity != null && storeFrontItem.validity.toString().trim() == "" )
            storeFrontItem.validity = 0;     
        if(storeFrontItem.transferPrice != null && storeFrontItem.transferPrice.toString().trim() == "" )
            storeFrontItem.transferPrice = 0;     
        if(storeFrontItem.isTransfered != null && storeFrontItem.isTransfered.toString().trim() == "" )
            storeFrontItem.isTransfered = 0;     
            
        return storeFrontItem;
    }

    static initTotalSales(totalSales)
    {
        if(totalSales.isiUlang != null && totalSales.isiUlang.toString().trim() == "" )
            totalSales.isiUlang = 0;
        if(totalSales.totalRataPenjualan != null && totalSales.totalRataPenjualan.toString().trim() == "" )
            totalSales.totalRataPenjualan = 0;
        if(totalSales.totalPenjualanKartuPerdanaMicro != null && totalSales.totalPenjualanKartuPerdanaMicro.toString().trim() == "" )
            totalSales.totalPenjualanKartuPerdanaMicro = 0;
        if(totalSales.totalPenjualanKartuPerdanaLow != null && totalSales.totalPenjualanKartuPerdanaLow.toString().trim() == "" )
            totalSales.totalPenjualanKartuPerdanaLow = 0;
        if(totalSales.totalPenjualanKartuPerdanaMid != null && totalSales.totalPenjualanKartuPerdanaMid.toString().trim() == "" )
            totalSales.totalPenjualanKartuPerdanaMid = 0;
        if(totalSales.totalPenjualanKartuPerdanaHigh != null && totalSales.totalPenjualanKartuPerdanaHigh.toString().trim() == "" )
            totalSales.totalPenjualanKartuPerdanaHigh = 0;
        if(totalSales.totalPenjualanVoucherFisikMicro != null && totalSales.totalPenjualanVoucherFisikMicro.toString().trim() == "" )
            totalSales.totalPenjualanVoucherFisikMicro = 0;
        if(totalSales.totalPenjualanVoucherFisikLow != null && totalSales.totalPenjualanVoucherFisikLow.toString().trim() == "" )
            totalSales.totalPenjualanVoucherFisikLow = 0;     
        if(totalSales.totalPenjualanVoucherFisikLow != null && totalSales.totalPenjualanVoucherFisikLow.toString().trim() == "" )
            totalSales.totalPenjualanVoucherFisikLow = 0;   
        if(totalSales.totalPenjualanVoucherFisikMid != null && totalSales.totalPenjualanVoucherFisikMid.toString().trim() == "" )
            totalSales.totalPenjualanVoucherFisikMid = 0;   
        if(totalSales.totalPenjualanVoucherFisikHigh != null && totalSales.totalPenjualanVoucherFisikHigh.toString().trim() == "" )
            totalSales.totalPenjualanVoucherFisikHigh = 0;   
        if(totalSales.totalPenjualanVoucherFisik != null && totalSales.totalPenjualanVoucherFisik.toString().trim() == "" )
            totalSales.totalPenjualanVoucherFisik = 0;   
        if(totalSales.totalPenjualanPerdana != null && totalSales.totalPenjualanPerdana.toString().trim() == "" )
            totalSales.totalPenjualanPerdana = 0;   
        if(totalSales.paketPalingBanyakDibeliBesaran != null && totalSales.paketPalingBanyakDibeliBesaran.toString().trim() == "" )
            totalSales.paketPalingBanyakDibeliBesaran = 0; 

        return totalSales;        
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
        //console.log(id)
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
            //console.log(sIds)

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


    static async validate(uploadfile)
    {
        let result = {success :  true, message: "Succesfull"};
        if(uploadfile.imageCategory.indexOf("poster") > -1)
        {
            if(uploadfile.posterType == "product" && (uploadfile.posterItems == null || uploadfile.posterItems.length == 0))
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

        let app = await ApplicationModel.findOne({ where: { isActive: 1 } })
        if( app != null && uploadfile.tag.toLowerCase().indexOf(app.version) == -1)
        {
            result = { success: false, message: "Mohon update aplikasi ke versi " + app.version + ". Aplikasi yang saat ini anda gunakan tidak berlaku lagi."}
        }

        if(result.success == false)
            result.error = result.message;


        return result;
    }

    static validateUpdate(uploadfile)
    {
        let result = {success :  true, message: "Succesfull"};

        return result;
    }
}

module.exports = UploadFileLogic;