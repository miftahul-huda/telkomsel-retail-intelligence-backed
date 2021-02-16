const UserModel  = require( '../models/usermodel')
const CountryAndCityModel  = require( '../models/countryandcitymodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
});

class UserLogic {

    static clear(user){
        var sjson = JSON.stringify(user);
        var clone = JSON.parse(sjson);
        console.log(clone);
        delete clone["password"]
        return clone;
    }

    static async login(email, password){
        if(email == "" ||  password == "")
            throw { success: false, message:  'Harap isi username dan password'};

        try{
            let users = await UserModel.findAll({
                where:
                {
                    [Op.and] : [
                        { email: { [Op.like] : email  }},
                        { password: { [Op.like] : password  }}
                    ]
                }
                ,
                include: CountryAndCityModel
            });
            let user = (users.length  > 0) ?  users[0] : null;
            console.log(user);
            if(user == null)
                return { success: false, message: 'User tidak terdaftar, atau password salah' }
            else
                return { success: true, payload: user }
        }
        catch (e){
            throw { success: false, message: e.message, error: e };
        }
    }

    static async register(user)
    {
        let result = this.validateCreate(user);
        if(result.success){
            try {
                user.createdAt = new Date();
                let newUser = await UserModel.create(user);
                console.log(newUser);
                //newUser = this.clear(user)
                result.payload = newUser;
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

    static async findAll()
    {
        try{
            let users  = await UserModel.findAll()
            return { success: true, payload: users }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword)
    {
        try{
            let users  = await UserModel.findAll({
                where: {
                    [Op.or] : [
                        {email: { [Op.like] : '%' + keyword + '%' }},
                        {firstname: { [Op.like] : '%' + keyword + '%' }},
                        {lastname: { [Op.like] :'%' + keyword + '%'}},
                    ]

                }
            })
            return { success: true, payload: users }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let user  = await UserModel.findByPk(id, { include: CountryAndCityModel } );
            return { success: true, payload: user }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  user)
    {
        let result = this.successate(user);
        console.log(id)
        if(result.success){
            try {
                let newUser = await UserModel.update(user, { where:  { id: id }  });
                newUser =  { username: newUser.username, firstname: newUser.firstname, lastname: newUser.lastname,  mail: newUser.mail, id: newUser.id }
                result.payload = newUser;
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
            let user  = await UserModel.findByPk(id);
            let result = await UserModel.destroy(user);
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(user){
        if(user.password == null || user.password.length ==  0)
            return {success :  false, message: "Password cannot be empty"}
        
        return this.validate(user);
    }

    static validate(user)
    {

        if(user.firstname == null  || user.firstname.length == 0)
            return {success :  false, message: "First name cannot be empty"}
        else if(user.email == null  || user.email.length == 0)
            return {success :  false, message: "Email cannot be empty"}
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = UserLogic;