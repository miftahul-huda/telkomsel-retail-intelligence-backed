var express = require('express');
var router = express.Router();
var Initialization = require("../initialization")


const NotificationLogic = require('../modules/logic/notificationlogic')


router.get('/set', function (req, res){

  NotificationLogic.runSetNotifications(Initialization.getSequelize()).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})

router.get("/:username", function(req, res){
  let username = req.params.username;
  NotificationLogic.getNotificationByUsername(username).then(function (result)
  {
      res.send(result);
  }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
  })
})

router.get("/set-reader/:id/:username", function(req, res){
  let username = req.params.username;
  let id  =  req.params.id;
  NotificationLogic.setNotificationReader(id, username).then(function (result)
  {
      res.send(result);
  }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
  })
})



module.exports = router;
