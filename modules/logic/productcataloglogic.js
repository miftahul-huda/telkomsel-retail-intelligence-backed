const ProductCatalogModel  = require( '../models/productcatalogmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

class ProductCatalogLogic {

    static async create(productCatalog)
    {
        let result = this.validateCreate(productCatalog);
        if(result.success){
            try {
                let newproductCatalog = await ProductCatalogModel.create(productCatalog);
                result.payload = newproductCatalog;
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
            let productCatalogs  = await ProductCatalogModel.findAll()
            return { success: true, payload: productCatalogs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByOperator(operator)
    {
        try{
            let productCatalogs  = await ProductCatalogModel.findAll({
                where: {
                    operator: {
                        [Op.like] : '%' + operator + '%'
                    }
                }
            })
            return { success: true, payload: productCatalogs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByOperatorAndPackageType(operator, packageType)
    {
        try{
            let productCatalogs  = await ProductCatalogModel.findAll({
                where: {
                    [Op.and] :
                    {
                        operator: {
                            [Op.like] : '%' + operator + '%'
                        },
                        packageType: {
                            [Op.like] : '%' + packageType + '%'
                        },
                    }

                }
            })
            return { success: true, payload: productCatalogs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByOperatorAndPackageTypeAndPackageName(operator, packageType, packageName)
    {
        try{
            let productCatalogs  = await ProductCatalogModel.findAll({
                where: {
                    [Op.and] :
                    {
                        operator: {
                            [Op.like] : '%' + operator + '%'
                        },
                        packageType: {
                            [Op.like] : '%' + packageType + '%'
                        },
                        packageName: {
                            [Op.like] : '%' + packageName + '%'
                        }
                    }

                }
            })
            return { success: true, payload: productCatalogs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let productCatalogs  = await ProductCatalogModel.findAll({
                where: {
                    [Op.or] : [
                        {operator: { [Op.like] : '%' + search + '%' }},
                        {packageType: { [Op.like] : '%' + search + '%' }}
                    ]

                }
            })
            return { success: true, payload: productCatalogs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let productCatalog  = await ProductCatalogModel.findByPk(id);

            return { success: true, payload: clone }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  productCatalog)
    {
        let result = this.validateCreate(productCatalog);
        console.log(id)
        if(result.success){
            try {
                let newproductCatalog = await ProductCatalogModel.update(productCatalog, { where:  { id: id }  });
                result.payload = newproductCatalog;
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
            let productCatalog  = await ProductCatalogModel.findByPk(id);
            let result = await ProductCatalogModel.destroy(productCatalog);
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(productCatalog){
        
        return this.validate(productCatalog);
    }

    static validate(productCatalog)
    {   
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = ProductCatalogLogic;