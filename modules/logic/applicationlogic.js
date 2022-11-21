const ApplicationModel  = require( '../models/applicationmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class ApplicationLogic {

    static async register()
    {
        let result = this.successateCreate(app);
        if(result.success){
            try {
                app.createdAt = new Date();
                let newapp = await ApplicationModel.create(app);
                newapp = this.clear(app)
                result.payload = newapp;
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

    static async checkUpdate(version)
    {
        try {
            let apps = await ApplicationModel.findAll();

            if(apps.length > 0)
            {
                let app = apps[0];
                if(app.version != version)
                {
                    return { success: true, payload: app, message: "Please update to new version"};
                }
                else
                {
                    return { success: false, payload: null, message: "App already updated"};
                }
            }
        }
        catch(error)
        {
            throw { success: false, message: 'error', error: error };
        }
    }

    static async findAll()
    {
        try{
            let apps  = await ApplicationModel.findAll()
            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let apps  = await ApplicationModel.findAll({
                where: {
                    [Op.or] : [
                        {appname: { [Op.like] : search.appname }},
                        {appdescription: { [Op.like] : search.firstname }}
                    ]

                }
            })
            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let app  = await ApplicationModel.findByPk(id);

            return { success: true, payload: clone }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async getByVersion(version)
    {
        try{
            let app  = await ApplicationModel.findOne({where: {version: version}});

            return { success: true, payload: app }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async getActiveApplication()
    {
        try{
            let app  = await ApplicationModel.findOne({where: {isActive: 1}});
            if(app != null)
                return { success: true, payload: app }
            else 
                return { success: false, error: {}, message: "No active application" }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  app)
    {
        let result = this.successate(app);
        if(result.success){
            try {
                let newapp = await ApplicationModel.update(app, { where:  { id: id }  });
                result.payload = newapp;
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
            let app  = await ApplicationModel.findByPk(id);
            let result = await ApplicationModel.destroy(app);
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static successateCreate(app){
        if(app.appname == null || app.appname.length ==  0)
            return {success :  false, message: "Name cannot be empty"}
        
        return this.successate(app);
    }

    static successate(app)
    {   
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = ApplicationLogic;