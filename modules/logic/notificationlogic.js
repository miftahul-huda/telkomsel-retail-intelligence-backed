const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const NotificationModel = require("../models/notificationmodel")
const CurrentCycleModel = require("../models/currentcyclemodel")
const ReportLogic = require("./reportlogic")
const { base64encode, base64decode } = require('nodejs-base64');
var moment = require('moment'); // require



class NotificationLogic
{
    static runSetNotifications(sequelize)
    {
        let promise = new Promise((resolve,  reject)=>{
            this.setCompletenessReportNotification(sequelize)
            resolve({ success: true})
        })
        
        return promise;
    }

    static getNotificationByUsername(username)
    {
        let promise = new Promise((resolve,  reject)=>{

            let ands = { [Op.and]: [
                { username: { [Op.iLike]: username }},
                { readers: { [Op.iLike]: "%" + username + "%" }}
            ] }
            NotificationModel.findAll({where: ands }).then((notifications)=>{
                resolve({ success: true, payload: notifications })
            }).catch((err)=>{
                reject( {success: false, error: err})
            })
        })
        return promise;
    }

    static setNotificationReader(id, username)
    {
        let promise = new Promise((resolve,  reject)=>{

            NotificationModel.update( {readers: username}, { where: { id: id  } }).then((result)=>{
                resolve({ success: true, payload: result })
            }).catch((err)=>{
                reject( {success: false, error: err})
            })
        })
        return promise;
    }

    static async setCompletenessReportNotification(sequelize)
    {
        let promise = new Promise(async (resolve, reject)=>{
            let currentCycle = await CurrentCycleModel.findOne({ where: { isActive: 1 } })
            if(currentCycle != null)
            {
                let startdate = currentCycle.cycleStartDate;
                let enddate = currentCycle.cycleEndDate;

                startdate = moment(startdate).format("YYYY-MM-DD")
                enddate = moment(enddate).format("YYYY-MM-DD")

                await NotificationModel.destroy({  where: { tag:  { [Op.iLike] : "completeness-report" }} })
    
                ReportLogic.getCompletenessReportByTime(sequelize, startdate, enddate).then((report)=>{
                    if(report.success)
                    {
                        let items = report.payload;
                        let notifications = [];
                        let usernames = []
                        
                        items.map(async (item)=>{
    
                            if(item.total_poster == null || item.total_storefront == null || item.total_etalase == null || item.total_totalsales == null)
                            {
                                if(usernames.includes(item.username) == false)
                                {
                                    let data = { username: item.username }
                                    data =  JSON.stringify(data);
                                    data = base64encode(data);
                                    
                                    let notification = {
                                        title: "Masih ada outlet yg belum diisi",
                                        content: "Hai, " + item.username + ", Masih ada outlet yang pencapaiannya belum terpenuhi.",
                                        data: data,
                                        username: item.username,
                                        isActive: 1,
                                        tag: "completeness-report"
                                    }
                                    notifications.push(notification)
                                    usernames.push(item.username)
                                }
                            }
                        })

                        this.saveNotifications(notifications, 0, function(){
                            resolve()
                        })
    
                    }
                }).catch((Err)=>{
                    console.log("error.setCompletenessReportNotification()");
                    console.log(Err)
                    reject(Err)
                })
            }
        })

        return promise;
        
    }

    static saveNotifications(notifications, idx, callback)
    {
        if(idx < notifications.length)
        {
            let notification = notifications[idx]
            NotificationModel.create(notification).then(()=>{
                this.saveNotifications(notifications, idx+1, callback)
            }).catch((e)=>{

                console.log("error saving notification")
                console.log(notification)
                this.saveNotifications(notifications, idx+1, callback)
            })

        }
        else 
        {
            if(callback != null)
                callback()
        }
    }
}

module.exports = NotificationLogic;