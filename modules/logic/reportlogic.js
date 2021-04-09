const OperatorModel  = require( '../models/operatormodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op, QueryTypes } = require("sequelize");


class ReportLogic {
    static async getAllPostersWithPackageItems(sequelize)
    {
        try{
            const posters = await sequelize.query("select * from uploadfile u inner join filepackageitem i " +
            "on i.upload_file_id = u.id", { type: QueryTypes.SELECT });

            return { success: true, payload: posters};
        }
        catch(err)
        {
            return {success: false, error: err, message: err.message}
        }
    }

    static async getAllPosters(sequelize, offset, limit)
    {
        try{

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'poster'";

            let sql = "select uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.upload_date, " +
            "count(filepackageitem.upload_file_id) as total from " +
            "uploadfile left join " +
            "filepackageitem on " +
            "uploadfile.id = filepackageitem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'poster' " +
            "group by uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.upload_date " +
            "order by uploadfile.id desc " +
            "offset " + offset + " limit " + limit;

            const totalData = await sequelize.query(sqlTotal, { type: QueryTypes.SELECT });
            const posters = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: posters, allTotal: totalData};
        }
        catch(err)
        {
            return {success: false, error: err, message: err.message}
        }
    }

    static async getAllPostersByUploader(sequelize, uploader, offset, limit, opt=null)
    {
        try{

            let sqlwhere = "";
            if(opt != null)
            {
                if(opt.outlet != "*")
                   sqlwhere = " and uploadfile.store_id like '" + opt.outlet + "' ";

                if(opt.date != "*")
                {
                    let dt = new Date(opt.date).toISOString().slice(0, 10)
                    sqlwhere = " and uploadfile.upload_date between '" + dt + " 00:00:00' and '" + dt + " 23:59:59' ";
                }
                   
            }

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'poster' and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' " + sqlwhere;

            let sql = "select uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(filepackageitem.upload_file_id) as total from " +
            "uploadfile left join " +
            "filepackageitem on " +
            "uploadfile.id = filepackageitem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'poster' " +
            "and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' " + sqlwhere +
            "group by uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date " +
            "order by uploadfile.id desc " +
            "offset " + offset + " limit " + limit;

            const totalData = await sequelize.query(sqlTotal, { type: QueryTypes.SELECT });
            const posters = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: posters, allTotal: totalData};
        }
        catch(err)
        {
            return {success: false, error: err, message: err.message}
        }
    }


    static async getAllStoreFrontsWithPackageItems(sequelize)
    {
        try{
            const posters = await sequelize.query("select * from uploadfile u inner join storefrontitem i " +
            "on i.upload_file_id = u.id", { type: QueryTypes.SELECT });

            return { success: true, payload: posters};
        }
        catch(err)
        {
            return {success: false, error: err, message: err.message}
        }
    }

    static async getAllStoreFronts(sequelize, offset, limit)
    {
        try{

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'storefront'";

            let sql = "select uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(storefrontitem.upload_file_id) as total from " +
            "uploadfile left join " +
            "storefrontitem on " +
            "uploadfile.id = storefrontitem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'storefront' " +
            "group by uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date " +
            "order by uploadfile.id desc " +
            "offset " + offset + " limit " + limit;

            const totalData = await sequelize.query(sqlTotal, { type: QueryTypes.SELECT });
            const storefronts = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: storefronts, allTotal: totalData};
        }
        catch(err)
        {
            return {success: false, error: err, message: err.message}
        }
    }

    static async getAllStoreFrontsByUploader(sequelize, uploader, offset, limit, opt=null)
    {
        try{
            let sqlwhere = "";
            if(opt != null)
            {
                if(opt.outlet != "*")
                   sqlwhere = " and uploadfile.store_id like '" + opt.outlet + "' ";

                if(opt.date != "*")
                {
                    let dt = new Date(opt.date).toISOString().slice(0, 10)
                    sqlwhere = " and uploadfile.upload_date between '" + dt + " 00:00:00' and '" + dt + " 23:59:59' ";
                }
                   
            }

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'storefront' and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' "  + sqlwhere;

            let sql = "select uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(storefrontitem.upload_file_id) as total from " +
            "uploadfile left join " +
            "storefrontitem on " +
            "uploadfile.id = storefrontitem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'storefront' " +
            "and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' " + sqlwhere +
            "group by uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date " +
            "order by uploadfile.id desc " +
            "offset " + offset + " limit " + limit;

            const totalData = await sequelize.query(sqlTotal, { type: QueryTypes.SELECT });
            const storefronts = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: storefronts, allTotal: totalData};
        }
        catch(err)
        {
            return {success: false, error: err, message: err.message}
        }
    }
}

module.exports = ReportLogic;