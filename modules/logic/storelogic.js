const StoreModel  = require( '../models/storemodel')
const StoreUserModel  = require( '../models/storeusermodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const { condition } = require('sequelize');
const { Store } = require('express-session');

class StoreLogic {

    static async findAll(area)
    {
        try{
            let where = {};
            if(area != null)
                where = {  store_area: { [Op.iLike] : area } }

            let stores  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('storeid')), 'storeid'], 'store_name', 'store_area', 'store_city'],
                where: where,
                limit: 1
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllByCity(city)
    {
        try{
            let where = {};
            let limit = 1;

            if(city != null)
            {
                where = {
                    [Op.and]:
                    [
                        { tag: { [Op.ne] : null } },
                        { tag: { [Op.ne] : '' } },
                        { store_city: { [Op.iLike] : city }  }
                    ]
                } 
                limit = 1;

            }

            let stores  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('storeid')), 'storeid'], 'store_name', 'store_city', 'store_area'],
                where: where,
                limit: limit
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllCity()
    {
        try{

            let cities  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('store_city')), 'city']]
            });

            return { success: true, payload: cities }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllArea()
    {
        try{

            let areas  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('store_area')), 'area']]
            });

            return { success: true, payload: areas }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllKecamatan(city)
    {
        try{

            let areas  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('store_kecamatan')), 'kecamatan']],
                where:{
                    store_city :{
                        [Op.iLike]:city
                    } 
                }
            });

            return { success: true, payload: areas }
        }
        catch (error)
        {
            console.log(error)
            throw { success: false, message: '', error: error };
        }
    }
    static async findAllNoLimit(area)
    {
        try{
            let where = {};
            if(area != null)
                where = {  store_area: { [Op.iLike] : area } }

            let stores  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('storeid')), 'storeid'], 'store_name', 'store_area', 'store_city'],
                where: where
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllNoLimitByCity(city)
    {
        try{
            let where = {};
            if(city != null)
                where = {  store_city: { [Op.iLike] : city } }

            let stores  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('storeid')), 'storeid'], 'store_name', 'store_city', 'store_area'],
                where: where
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword, area)
    {
        try{
            let where = {
                [Op.or] : [
                    {store_name: { [Op.iLike] : '%' + keyword + '%' }},
                    {storeid: { [Op.iLike] : '%' + keyword + '%' }}
                ]
            };

            if(area != null)
            {
                where = {
                    [Op.and] : [
                        where,
                        {store_area: { [Op.iLike] : area }}   
                    ]
                }
            }

            let stores  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('storeid')), 'storeid'], 'store_name', 'store_area', 'store_city'],
                where: where,
                limit: 1
            });


            return { success: true, payload: stores  }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeywordByCity(keyword, city)
    {
        try{
            let where = {
                [Op.and]:[
                    {
                        [Op.and] :
                        [
                            { tag: { [Op.ne] : null } },
                            { tag: { [Op.ne] : '' } }
                        ]
                    }
                    ,
                    {
                        [Op.or] : [
                            {store_name: { [Op.iLike] : '%' + keyword + '%' }},
                            {storeid: { [Op.iLike] : '%' + keyword + '%' }}
                        ]
                    }

                ]

            };



            if(city != null)
            {
                where[Op.and].push({store_city: { [Op.iLike] : city }})
                /*where = {
                    [Op.and] : [
                        where,
                        {store_city: { [Op.iLike] : city }}   
                    ]
                }*/
            }

            let stores  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('storeid')), 'storeid'], 'store_name', 'store_city', 'store_area'],
                where: where,
                limit: 3
            });


            return { success: true, payload: stores  }
        }
        catch (error)
        {
            console.log(error)
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let store    = await StoreModel.findByPk(id);
            return { success: true, payload: store }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async create(store)
    {
        let result = this.validateCreate(store);
        if(result.success){
            try {
                
                store = StoreLogic.upper(store);
                let newStore = await StoreModel.create(store);
                //newUser = this.clear(user)
                result.payload = newStore;
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
            let result = await StoreModel.destroy({
                where: {
                    id: id
                }
            });
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(store)
    {
        
        if(store.store_name == null || store.store_name.trim().length == 0)
            return { success: false, message: 'Masukkan nama outlet' }
        if(store.storeid == null || store.storeid.trim().length == 0)
            return { success: false, message: 'Masukkan  ID outlet' }
        if(store.store_city == null || store.store_city.trim().length == 0)
            return { success: false, message: 'Masukkan kota/kabupaten outlet' }
        if(store.store_area == null || store.store_area.trim().length == 0)
            return { success: false, message: 'Masukkan area outlet' }
        if(store.store_cluster == null || store.store_cluster.trim().length == 0)
            return { success: false, message: 'Masukkan cluster outlet' }
        if(store.store_region == null || store.store_region.trim().length == 0)
            return { success: false, message: 'Masukkan region outlet' }
        if(store.store_branch == null || store.store_branch.trim().length == 0)
            return { success: false, message: 'Masukkan branch outlet' }
        return { success: true, message: '' }
    }

    static upper(store)
    {
        store.store_area = store.store_area.toUpperCase();
        store.store_city = store.store_city.toUpperCase();
        store.store_cluster = store.store_cluster.toUpperCase();
        store.store_region = store.store_region.toUpperCase();
        store.store_branch = store.store_branch.toUpperCase();

        return store;
    }

    static async findByUserOrSFCode(username, sfcode)
    {
        try{

            let cond1 = { username: {[Op.iLike] : '%' + username + '%' } };
            let cond2 = { sfcode: {[Op.iLike] : '%' + sfcode + '%' } };
            let cond = {
                [Op.and]:[
                    {
                        [Op.or]: [
                            cond1, cond2
                        ]
                    }
                    ,
                    {
                        [Op.and] :
                        [
                            { tag: { [Op.ne] : null } },
                            { tag: { [Op.ne] : '' } }
                        ]
                    }
                ]
                
            }

            //cond = cond2;

            let stores  = await StoreUserModel.findAll({
                where: cond
            });

            let storeids = [];
            stores.map((store)=>{
                storeids.push(store.storeid);
            })


            stores  = await StoreModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('storeid')), 'storeid'], 'store_name', 'store_city', 'store_area'],
                where:{ 
                    [Op.and]:[
                        { storeid : {  [Op.in]: storeids } },
                        { tag : {
                            [Op.ne] : null
                        } },
                        { tag : {
                            [Op.ne] : ''
                        } }
                    ]
                     
                }            
            });

            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByUserOrSFCodeAndKeyword(username, sfcode, keyword)
    {
        try{

            let cond1 = { username: {[Op.iLike] : '%' + username + '%' } };
            let cond2 = { sfcode: {[Op.iLike] : '%' + sfcode + '%' } };
            let cond = {
                [Op.and]:[
                    {
                        [Op.or]: [
                            cond1, cond2
                        ]
                    }
                    ,
                    {
                        [Op.and] :
                        [
                            { tag: { [Op.ne] : null } },
                            { tag: { [Op.ne] : '' } }
                        ]
                    }
                ]
                
            }
            let stores  = await StoreUserModel.findAll({
                where: cond
            });
            return { success: true, payload: stores }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



}

module.exports = StoreLogic;