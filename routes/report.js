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

router.get('/uploads/total-by-uploader/:uploader', function (req, res){
  
    let uploader = req.params.uploader;

    ReportLogic.getTotalUploadsByUploader(Initialization.getSequelize(), uploader).then(function (result)
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

router.post('/poster-before-after/byuploader/:uploader/:offset/:limit', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;
    let uploader = req.params.uploader;
    let opt = req.body;

    ReportLogic.getAllPosterBeforeAfterByUploader(Initialization.getSequelize(), uploader, offset, limit, opt).then(function (result)
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

router.post('/storefront-before-after/byuploader/:uploader/:offset/:limit', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;
    let uploader = req.params.uploader;
    let opt = req.body;

    ReportLogic.getAllStoreFrontBeforeAfterByUploader(Initialization.getSequelize(), uploader, offset, limit, opt).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})

router.post('/totalsales/byuploader/:uploader/:offset/:limit', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;
    let uploader = req.params.uploader;
    let opt = req.body;

    ReportLogic.getAllTotalSalesByUploader(Initialization.getSequelize(), uploader, offset, limit, opt).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})

router.post('/etalase/byuploader/:uploader/:offset/:limit', function (req, res){
  
    let offset = req.params.offset;
    let limit = req.params.limit;
    let uploader = req.params.uploader;
    let opt = req.body;

    ReportLogic.getAllEtalaseByUploader(Initialization.getSequelize(), uploader, offset, limit, opt).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})

router.get("/completeness/:username",  function(req,res) {
    let username  = req.params.username
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;

    ReportLogic.getCompletenessReportByUsernameAndTime( Initialization.getSequelize(), username, startdate, enddate).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error /completeness/:username " + username + ", startdate: " + startdate + ", enddate: " + enddate)
        console.log(err);
        res.send(err)
    })
})

router.get("/completeness",  function(req,res) {
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;

    ReportLogic.getCompletenessReportByTime( Initialization.getSequelize(), startdate, enddate).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error /completeness, startdate: " + startdate + ", enddate: " + enddate)
        console.log(err);
        res.send(err)
    })
})


router.get("/raw/poster",  function(req,res) {
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;

    ReportLogic.getPosterRawData( Initialization.getSequelize(), startdate, enddate).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error /raw/poster, startdate: " + startdate + ", enddate: " + enddate)
        console.log(err);
        res.send(err)
    })
})

router.get("/raw/storefront",  function(req,res) {
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;

    ReportLogic.getStoreFrontRawData( Initialization.getSequelize(), startdate, enddate).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error /raw/storefront, startdate: " + startdate + ", enddate: " + enddate)
        console.log(err);
        res.send(err)
    })
})


router.get("/raw/etalase",  function(req,res) {
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;

    ReportLogic.getEtalaseRawData( Initialization.getSequelize(), startdate, enddate).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error /raw/etalase, startdate: " + startdate + ", enddate: " + enddate)
        console.log(err);
        res.send(err)
    })
})


router.get("/raw/totalsales",  function(req,res) {
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;

    ReportLogic.getTotalSalesRawData( Initialization.getSequelize(), startdate, enddate).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("error /raw/totalsales, startdate: " + startdate + ", enddate: " + enddate)
        console.log(err);
        res.send(err)
    })
})


module.exports = router;