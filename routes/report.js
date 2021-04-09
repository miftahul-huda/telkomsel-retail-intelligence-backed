var express = require('express');
var router = express.Router();
var Initialization = require("../initialization")

const ReportLogic = require("../modules/logic/reportlogic");

router.get('/posters/:offset/:limit', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;

    ReportLogic.getAllPosters(Initialization.getSequelize(), offset, limit).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})

router.post('/posters/byuploader/:uploader/:offset/:limit', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;
    let uploader = req.params.uploader;
    let opt = req.body;

    ReportLogic.getAllPostersByUploader(Initialization.getSequelize(), uploader, offset, limit, opt).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})


router.get('/storefronts', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;

    ReportLogic.getAllStoreFronts(Initialization.getSequelize(), offset, limit).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})

router.post('/storefronts/byuploader/:uploader/:offset/:limit', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;
    let uploader = req.params.uploader;
    let opt = req.body;

    ReportLogic.getAllStoreFrontsByUploader(Initialization.getSequelize(), uploader, offset, limit, opt).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})
  

module.exports = router;