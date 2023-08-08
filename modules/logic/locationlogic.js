const LocationModel  = require( '../models/locationmodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const { condition } = require('sequelize');
const CityRegionAreaModel = require('../models/cityregionareamodel');
const StoreLocationModel = require('../models/storelocationmodel');


class LocationLogic {

    static async findAllProvinces()
    {
        try{
            let where = {};

            let provinces  = await LocationModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('province')), 'province']]
            });
            return { success: true, payload: provinces }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllCitiesByProvince(province)
    {
        try{
            let where = {
                province: {
                    [Op.iLike]: province
                }
            };

            let cities  = await LocationModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
                where: where
            });
            return { success: true, payload: cities }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllDistrictsByCity(city)
    {
        try{
            let where = {
                city: {
                    [Op.iLike]: city
                }
            };

            let districts  = await LocationModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('district')), 'district']],
                where: where
            });

            if(districts == null || districts.length == 0)
            {
                districts  = await StoreLocationModel.findAll({
                    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('district')), 'district']],
                    where: where
                });
            }
            return { success: true, payload: districts }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllVillagesByDistrict(district)
    {
        try{
            let where = {
                district: {
                    [Op.iLike]: district
                }
            };

            let villages  = await LocationModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('village')), 'village']],
                where: where
            });
            return { success: true, payload: villages }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllAreas()
    {
        try{

            let areas  = await CityRegionAreaModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('area')), 'area']]
            });
            return { success: true, payload: areas }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }



    static async findAllCitiesByCluster(cluster)
    {
        try{

            let cities  = await StoreLocationModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
                where: {
                    cluster: {
                        [Op.iLike]: cluster
                    }
                }
            });
            return { success: true, payload: cities }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllClustersByBranch(branch)
    {
        try{

            let clusters  = await StoreLocationModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('cluster')), 'cluster']],
                where: {
                    branch: {
                        [Op.iLike]: branch
                    }
                }
            });
            return { success: true, payload: clusters }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllBranchesByRegion(region)
    {
        try{

            let branches  = await StoreLocationModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('branch')), 'branch']],
                where: {
                    region: {
                        [Op.iLike]: region
                    }
                }
            });
            return { success: true, payload: branches }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllRegionsByArea(area)
    {
        try{

            let regions  = await CityRegionAreaModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('region')), 'region']],
                where: {
                    area: {
                        [Op.iLike]: area
                    }
                }
            });
            return { success: true, payload: regions }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findAllCitiesByRegion(region)
    {
        try{

            let cities  = await CityRegionAreaModel.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
                where: {
                    region: {
                        [Op.iLike]: region
                    }
                }
            });
            return { success: true, payload: cities }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }
}

module.exports = LocationLogic;