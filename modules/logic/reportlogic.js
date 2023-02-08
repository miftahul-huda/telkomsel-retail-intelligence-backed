const OperatorModel  = require( '../models/operatormodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op, QueryTypes } = require("sequelize");
const { query } = require('express');

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

    static addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }      

    static formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     

    static async getCompletenessReportByUsernameAndTime(sequelize, username, startdate, enddate)
    {
        try
        {

            startdate = ReportLogic.addDays(startdate, -1);
            enddate = ReportLogic.addDays(enddate, 1);

            startdate = ReportLogic.formatDate(startdate);
            enddate = ReportLogic.formatDate(enddate);

            console.log(startdate)
            console.log(enddate)

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


    static async getPosterRawData(sequelize, startdate, enddate, offset, limit)
    {
        try{

            //startdate = ReportLogic.addDays(startdate, -1);
            //enddate = ReportLogic.addDays(enddate, 1);

            startdate = new Date(startdate);
            enddate = new Date(enddate);
            
            startdate = startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate() + " 00:00:00";
            enddate = enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate() + " 23:59:59";

            //startdate = ReportLogic.formatDate(startdate);
            //enddate = ReportLogic.formatDate(enddate);

            let sql = `
            select 
                filename as original_filename,
                upload_date,
                picture_taken_date,
                picture_taken_by,
                uploaded_by_email as uploader_username,
                uploaded_by_fullname as uploader_name,
                phoneNumber as uploader_phone,
                uploaded_filename,
                lon,
                lat,
                alt,
                exposure_time,
                iso_speed_rating,
                orientation,
                flash,
                pixel_width,
                pixel_height,
                make,
                model,
                "uploadfile"."store_id"  as storeid,
                "uploadfile"."store_name" as store_name,
                "store"."store_city" as store_city,
                "store"."store_area" as store_area,
                "store"."store_branch" as store_branch,
                "store"."store_region" as store_region,
                "operator" as poster_operator,
                "posterType" as poster_type,
                "posterCategory" as poster_category,
                "areaPromotion" as poster_promotion_area,
                posteritem.denome as poster_item_denome,
                "posteritem"."quotaGb" as poster_item_quotagb,
                "posteritem"."transferPrice" as poster_item_transfer_price,
                "posteritem"."endUserPrice" as poster_item_end_user_price,
                "posteritem"."activeDays" as poster_item_active_days
            from uploadfile
            inner join posteritem
            on 
                uploadfile.id = posteritem.upload_file_id   
            left join store
            on
                uploadfile.store_id = store.storeid
            where                 
                "upload_date" between '${startdate}' and '${enddate}' 
            offset ${offset} limit ${limit}     
            `;

            const posters = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: posters};
        }
        catch(err)
        {
            throw {success: false, error: err, message: err.message}
        }
    }

    static async getStoreFrontRawData(sequelize, startdate, enddate, offset, limit)
    {
        try{

            startdate = new Date(startdate);
            enddate = new Date(enddate);
            
            startdate = startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate() + " 00:00:00";
            enddate = enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate() + " 23:59:59";


            let sql = `
            select 
                filename as original_filename,
                upload_date,
                picture_taken_date,
                picture_taken_by,
                uploaded_by_email as uploader_username,
                uploaded_by_fullname as uploader_name,
                phoneNumber as uploader_phone,
                uploaded_filename,
                lon,
                lat,
                alt,
                exposure_time,
                iso_speed_rating,
                orientation,
                flash,
                pixel_width,
                pixel_height,
                make,
                model,
                "uploadfile"."store_id"  as storeid,
                "uploadfile"."store_name" as store_name,
                "store"."store_city" as store_city,
                "store"."store_area" as store_area,
                "store"."store_branch" as store_branch,
                "store"."store_region" as store_region,
                "operatorDominant" as storefront_dominant_operator,
                "storefrontitem"."operator" as storefront_item_operator,
                "storefrontitem"."percentage" as storefront_item_operator_percentage
            from uploadfile
            inner join storefrontitem
            on 
                uploadfile.id = storefrontitem.upload_file_id
            left join store
            on
                uploadfile.store_id = store.storeid
            where                 
                "upload_date" between '${startdate}' and '${enddate}'  
            offset ${offset} limit ${limit}    
            `;

            const storefronts = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: storefronts};
        }
        catch(err)
        {
            throw {success: false, error: err, message: err.message}
        }
    }

    static async getEtalaseRawData(sequelize, startdate, enddate, offset, limit)
    {
        try{

            startdate = new Date(startdate);
            enddate = new Date(enddate);
            
            startdate = startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate() + " 00:00:00";
            enddate = enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate() + " 23:59:59";


            let sql = `
            select 
                filename as original_filename,
                upload_date,
                picture_taken_date,
                picture_taken_by,
                uploaded_by_email as uploader_username,
                uploaded_by_fullname as uploader_name,
                phoneNumber as uploader_phone,
                uploaded_filename,
                lon,
                lat,
                alt,
                exposure_time,
                iso_speed_rating,
                orientation,
                flash,
                pixel_width,
                pixel_height,
                make,
                model,
                "uploadfile"."store_id"  as storeid,
                "uploadfile"."store_name" as store_name,
                "store"."store_city" as store_city,
                "store"."store_area" as store_area,
                "store"."store_branch" as store_branch,
                "store"."store_region" as store_region,
                "etalaseitem"."operator" as etalase_operator,
                "etalaseitem"."visibility_percentage" as etalaseitem_visibility_percentage,
                "etalaseitem"."availability_percentage" as etalaseitem_availability_percentage,
                "etalaseitem"."visibility_score" as etalaseitem_visibility_score,
                "etalaseitem"."availability_score" as etalaseitem_availability_score,
                "outletscore"."outlet_score" as av_score
            from uploadfile
            inner join etalaseitem
            on 
                uploadfile.id = etalaseitem.upload_file_id
            left join store
            on
                uploadfile.store_id = store.storeid 
            left join outletscore
            on
                uploadfile.id = outletscore.upload_file_id
            where                 
                "upload_date" between '${startdate}' and '${enddate}'  
            offset ${offset} limit ${limit}    
            `;

            //console.log(sql)

            const etalase = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: etalase};
        }
        catch(err)
        {
            throw {success: false, error: err, message: err.message}
        }
    }

    static async getTotalSalesRawData(sequelize, startdate, enddate, offset, limit)
    {
        try{

            startdate = new Date(startdate);
            enddate = new Date(enddate);
            
            startdate = startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate() + " 00:00:00";
            enddate = enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate() + " 23:59:59";


            let sql = `
            select 
                filename as original_filename,
                upload_date,
                picture_taken_date,
                picture_taken_by,
                uploaded_by_email as uploader_username,
                uploaded_by_fullname as uploader_name,
                phoneNumber as uploader_phone,
                uploaded_filename,
                lon,
                lat,
                alt,
                exposure_time,
                iso_speed_rating,
                orientation,
                flash,
                pixel_width,
                pixel_height,
                make,
                model,
                "uploadfile"."store_id"  as storeid,
                "uploadfile"."store_name" as store_name,
                "store"."store_city" as store_city,
                "store"."store_area" as store_area,
                "store"."store_branch" as store_branch,
                "store"."store_region" as store_region,
                "totalsales"."isiUlang" as totalsales_isiulang_palingbanyak_dibeli,
                "totalsales"."paketPalingBanyakDibeli" as totalsales_paket_palingbanyak_dibeli,
                "totalsales"."paketPalingBanyakDibeliBesaran" as totalsales_besaran_paket_palingbanyak_dibeli,
                "totalsales"."operator" as totalsales_item_operator,
                "totalsales"."totalPenjualanPerdana" as totalsales_item_penjualan_perdana,
                "totalsales"."totalPenjualanVoucherFisik" as totalsales_item_total_penjualan_voucher_fisik
            from uploadfile
            inner join totalsales
            on 
                uploadfile.id = totalsales.upload_file_id
            left join store
            on
                uploadfile.store_id = store.storeid
            where                 
                "upload_date" between '${startdate}' and '${enddate}'   
            offset ${offset} limit ${limit}   
            `;

            const totalsales = await sequelize.query(sql, { type: QueryTypes.SELECT });

            return { success: true, payload: totalsales};
        }
        catch(err)
        {
            throw {success: false, error: err, message: err.message}
        }
    }
}

module.exports = ReportLogic;