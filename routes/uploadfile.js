var express = require('express');
var router = express.Router();

const UploadFileLogic = require('../modules/logic/uploadfilelogic')


router.post('/create', function (req, res){
    let uploadfile = req.body;

    UploadFileLogic.create(uploadfile).then(function (saveduploadfile)
    {
        res.send(saveduploadfile);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})

router.get('/', function (req, res){

    UploadFileLogic.findAll().then(function (uploadfiles)
    {
        res.send(uploadfiles);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/transfered/:isTransfered', function (req, res){

  let isTransfered = req.params.isTransfered;
  UploadFileLogic.findByIsTransfered(isTransfered).then(function (uploadfiles)
  {
      res.send(uploadfiles);
  }).catch(function (err){
      console.log("error")
      res.send(err);
  })
})

router.get('/user/:email', function (req, res){
    let email = req.params.email;
    UploadFileLogic.findByEmail(email).then(function (uploadfiles)
    {
        res.send(uploadfiles);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/total-upload/:email', function (req, res){
  let email = req.params.email;
  UploadFileLogic.getTotalByEmail(email).then(function (uploadfiles)
  {
      res.send(uploadfiles);
  }).catch(function (err){
      console.log("error")
      res.send(err);
  })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    UploadFileLogic.get(id).then(function (uploadfile)
    {
      res.send(uploadfile);
    }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
    })
})

router.get('/before-after/:id', function (req, res){
  let id = req.params.id;

  UploadFileLogic.getByBeforeAfterID(id).then(function (uploadfile)
  {
    res.send(uploadfile);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    UploadFileLogic.findByKeyword(keyword).then(function (uploadfiles)
    {
      res.send(uploadfiles);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



router.post('/update/:id', function (req, res){
  let uploadfile = req.body;
  let id = req.params.id;

  UploadFileLogic.update(id, uploadfile).then(function (saveduploadfile)
  {
    res.send(saveduploadfile);
  }).catch(function (err){
    console.log("error")
    console.log(err);
    res.send(err);
  })
})

router.get('/update-istransfered/:ids/:isTransfered', function (req, res){
  let isTransfered = req.params.isTransfered;
  let ids = req.params.ids;

  UploadFileLogic.updateIsTransfered(ids, isTransfered).then(function (saveduploadfile)
  {
    res.send(saveduploadfile);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  UploadFileLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
