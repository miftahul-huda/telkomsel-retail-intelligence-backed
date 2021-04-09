const UploadFileModel  = require( '../models/uploadfilemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class UploadFileLogic {


    static async create(uploadfile)
    {
        delete uploadfile.id;
        uploadfile.id = null;
        let result = this.validate(uploadfile);
        if(result.success){
            try {
                uploadfile.isTransfered = 0;
                let newUploadFile = await UploadFileModel.create(uploadfile);
                console.log("=======newUploadFile======")
                console.log(newUploadFile);
                console.log("id")
                console.log(newUploadFile.id)
                console.log("================")
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

    static async update(id,  uploadfile)
    {
        let result = this.validate(uploadfile);
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
            let uploadfile  = await UploadFileModel.findByPk(id);
            let result = await UploadFileModel.destroy(uploadfile);
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static validate(uploadfile)
    {
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = UploadFileLogic;