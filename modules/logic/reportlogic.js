const OperatorModel  = require( '../models/operatormodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op, QueryTypes } = require("sequelize");

class ReportLogic {
    
    static async getTotalUploadsByUploader(sequelize, uploader)
    {
        try{
            const result = await sequelize.query("select count(*) as total from uploadfile where uploaded_by_email like '" + uploader + "'", { type: QueryTypes.SELECT });

            return { success: true, payload: result};
        }
        catch(err)
        {
            return {success: false, error: err, message: err.message}
        }
    }

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
            "count(filepackageitem.upload_file_id) as \"totalItems\" from " +
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

            let sql = "select uploadfile.id, uploadfile.filename, \"uploadfile\".\"imageCategory\", \"uploadfile\".\"posterType\", " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(posteritem.upload_file_id) as \"totalItems\" from " +
            "uploadfile left join " +
            "posteritem on " +
            "uploadfile.id = posteritem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'poster' " +
            "and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' " + sqlwhere +
            "group by uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, \"uploadfile\".\"imageCategory\", \"uploadfile\".\"posterType\" " +
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

    static async getAllPosterBeforeAfterByUploader(sequelize, uploader, offset, limit, opt=null)
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

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'poster-before-after' and \"uploadfile\".\"beforeAfterType\" like 'before'  and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' " + sqlwhere;

            let sql = "select uploadfile.id, uploadfile.filename, \"uploadfile\".\"beforeAfterID\", \"uploadfile\".\"beforeAfterType\"," +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(filepackageitem.upload_file_id) as \"totalItems\" from " +
            "uploadfile left join " +
            "filepackageitem on " +
            "uploadfile.id = filepackageitem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'poster-before-after'  and \"uploadfile\".\"beforeAfterType\" like 'before' " +
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
            "count(storefrontitem.upload_file_id) as \"totalItems\" from " +
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
            "count(storefrontitem.upload_file_id) as \"totalItems\" from " +
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

    static async getAllStoreFrontBeforeAfterByUploader(sequelize, uploader, offset, limit, opt=null)
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

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'storefront-before-after'  and \"uploadfile\".\"beforeAfterType\" like 'before' and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' "  + sqlwhere;

            let sql = "select uploadfile.id, uploadfile.filename, \"uploadfile\".\"beforeAfterID\", \"uploadfile\".\"beforeAfterType\"," +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(storefrontitem.upload_file_id) as \"totalItems\" from " +
            "uploadfile left join " +
            "storefrontitem on " +
            "uploadfile.id = storefrontitem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'storefront-before-after  and \"uploadfile\".\"beforeAfterType\" like 'before' " +
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

    static async getAllTotalSalesByUploader(sequelize, uploader, offset, limit, opt=null)
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

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'total-sales' and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' " + sqlwhere;

            let sql = "select uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(totalsales.upload_file_id) as \"totalItems\" from " +
            "uploadfile left join " +
            "totalsales on " +
            "uploadfile.id = totalsales.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'total-sales' " +
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

    static async getAllEtalaseByUploader(sequelize, uploader, offset, limit, opt=null)
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

            let sqlTotal = "select count(*) as total from uploadfile where \"uploadfile\".\"imageCategory\" like 'etalase' and \"uploadfile\".\"uploaded_by_email\" like '" + uploader + "' " + sqlwhere;

            let sql = "select uploadfile.id, uploadfile.filename, " +
            "uploadfile.store_id,uploadfile.store_name,uploadfile.uploaded_by_email, uploadfile.uploaded_filename, uploadfile.upload_date, " +
            "count(etalaseitem.upload_file_id) as \"totalItems\" from " +
            "uploadfile left join " +
            "etalaseitem on " +
            "uploadfile.id = etalaseitem.upload_file_id " +
            "where \"uploadfile\".\"imageCategory\" like 'etalase' " +
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

    static async getCompletenessReportByUsernameAndTime(sequelize, username, startdate, enddate)
    {
        try
        {

            let query = `
            
                select DISTINCT UPPER(su.storeid) as storeid, 
                UPPER(su.store_name) as store_name, 
                res.total_poster, 
                res.total_poster_telkomsel,
                res.total_poster_competitor,
                res.total_storefront,
                res.total_etalase,
                res.total_totalsales
                from "store_user" su
                left join
                (
                select 
                    r.store_id, 
                    r.store_name, 
                    sum(r.total_poster) as total_poster, 
                    sum(r.total_poster_telkomsel) as total_poster_telkomsel, 
                    sum(r.total_poster_competitor) as total_poster_competitor,
                    sum(r.total_storefront) as total_storefront,
                    sum(r.total_etalase) as total_etalase,
                    sum(r.total_totalsales) as total_totalsales

                from
                (
                select 
                    store_id, store_name,
                    case when "imageCategory" like 'poster' and "operator" like 'telkomsel' then count(*) end as total_poster_telkomsel,
                    case when "imageCategory" like 'poster' and "operator" not like 'telkomsel' then count(*) end as total_poster_competitor,
                    case when "imageCategory" like 'storefront' then count(*) end as total_storefront,
                    case when "imageCategory" like 'etalase' then count(*) end as total_etalase,
                    case when "imageCategory" like 'total-sales' then count(*) end as total_totalsales,
                    case when "imageCategory" like 'poster' then count(*) end as total_poster
                from "uploadfile"            
                where                 
                "upload_date" between '${startdate}' and '${enddate}'     
                and "uploaded_by_email" ilike '${username}' 
                group by "imageCategory", "operator", "store_id", "store_name"
                ) r
                group by r.store_id, r.store_name
                ) res
                on 
                su.storeid like res.store_id
                where
                su."username" like '${username}'
                `;

   

            let result = await sequelize.query(query, { type: QueryTypes.SELECT });
            result = ReportLogic.setStatus(result);

            return { success: true, payload: result};

        }
        catch(e){
            console.log(e)
            throw  { success: false, error: e};
        }    
    }

    static async getCompletenessReportByTime(sequelize, startdate, enddate)
    {
        try
        {
            let query = 
            "select A.storeid, A.store_name, A.username, " +  
            "    sum(A.total_poster) as total_poster,  " +  
            "    sum(A.total_storefront) as total_storefront, " +  
            "    sum(A.total_etalase) as total_etalase, " +  
            "    sum(A.total_totalsales) as total_totalsales " +  
            "from  " +  
            "(	 " +  
            "    select su.storeid, su.store_name, su.username, " +  
            "       case  " +  
            "           when u.\"imageCategory\" like 'poster' then count(u.*) " +  
            "        end " +  
            "        as total_poster, " +  

            "        case  " +  
            "            when u.\"imageCategory\" like 'storefront' then count(u.*) " +  
            "        end " +  
            "        as total_storefront, " +  

            "        case  " +  
            "            when u.\"imageCategory\" like 'etalase' then count(u.*) " +  
            "        end " +  
            "        as total_etalase, " +  

            "        case  " +  
            "            when u.\"imageCategory\" like 'total-sales' then count(u.*) " +  
            "        end " +  
            "        as total_totalsales " +  

            "    from \"store_user\" su " +  
            "    left join  " +  
            "        ( " +
            "            select *  " +  
            "            from \"uploadfile\"  " +  
            "            where  " +  
            "                \"upload_date\" between '" + startdate + "' and '" + enddate + "' " +  
            "        ) u  " +  
            "        on su.storeid = u.store_id " +  
            "        group by su.storeid, su.store_name, su.username, u.\"imageCategory\" " +  
            ") A " +  
            "group by A.storeid, A.store_name, A.username ";

            //console.log("==================")
            //console.log(query)
            

            const result = await sequelize.query(query, { type: QueryTypes.SELECT });
            return { success: true, payload: result};

        }
        catch(e){
            console.log(e)
            throw  { success: false, error: e};
        }    
    }

    static setZero(row)
    {
        if(row.total_poster == null)
            row.total_poster = 0;
        if(row.total_poster_telkomsel == null)
            row.total_poster_telkomsel = 0;
        if(row.total_poster_competitor == null)
            row.total_poster_competitor = 0;
        if(row.total_storefront == null)
            row.total_storefront = 0;
        if(row.total_etalase == null)
            row.total_etalase = 0;   
        if(row.total_totalsales == null)
            row.total_totalsales = 0;    
        
        return row;
    }

    static setStatus(rows)
    {
        rows.map((row)=>{
            row = ReportLogic.setZero(row);
            let complete = true;
            if(row.total_poster == 0)
            {
                complete = false;
            }

            if(row.total_poster_telkomsel == 0)
            {
                complete = false;
            }

            if(row.total_poster_competitor == 0)
            {
                complete = false;
            }
            if(row.total_storefront == 0)
            {
                complete = false;
            }
            if(row.total_etalase == 0)
            {
                complete = false;
            }
            if(row.total_totalsales == 0)
            {
                complete = false;
            }

            row.complete = complete;
        })

        return rows;
    }
}

module.exports = ReportLogic;