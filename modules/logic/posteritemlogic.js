const PosterItemModel  = require( '../models/posteritemmodel')
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Initialization = require('../../initialization');
const UploadFileModel = require('../models/uploadfilemodel');


class PosterItemLogic {


    static async create(posterItem)
    {
        delete posterItem.id;
        posterItem.id = null;
        let result = this.validateCreate(posterItem);
        if(result.success){
            try {
                posterItem.isTransfered = 0;
                let newposterItem = await PosterItemModel.create(posterItem);
                console.log(newposterItem);
                //newUploadFile = this.clear(uploadfile)
                result.payload = newposterItem;
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
            let posterItems  = await PosterItemModel.findAll()
            return { success: true, payload: posterItems }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByFileId(fileid)
    {
        console.log(fileid)
        try{
            let posterItems  = await PosterItemModel.findAll({
                where: {
                    upload_file_id : fileid
                }
            })

            console.log("posterItems")
            console.log(posterItems)
            return { success: true, payload: posterItems }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async get(id)
    {
        try{
            let posterItem  = await PosterItemModel.findByPk(id );
            return { success: true, payload: posterItem }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  posterItem)
    {
        let result = this.validateCreate(posterItem);
        console.log(id)
        if(result.success){
            try {
                let item = await PosterItemModel.update(posterItem, { where:  { id: id }  });
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

            let result = await PosterItemModel.destroy({ where: { id: id }});
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

            let result = await PosterItemModel.destroy({ where: { upload_file_id: id }});
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(posterItem)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = PosterItemLogic;