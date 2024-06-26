var express = require('express');
var router = express.Router();

const FilePackageItemLogic = require('../modules/logic/filepackageitemlogic')


router.post('/create', function (req, res){
    let filePackageItem = req.body;
 

    FilePackageItemLogic.create(filePackageItem).then(function (filePackageItem)
    {
        res.send(filePackageItem);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/', function (req, res){

  FilePackageItemLogic.findAll().then(function (filePackageItems)
    {
        res.send(filePackageItems);
    }).catch(function (err){
        console.log("error")
        console.log(err);
        res.send(err);
    })
})


router.get('/transfered/:isTransfered', function (req, res){

  let isTransfered = req.params.isTransfered;
  FilePackageItemLogic.findByIsTransfered(isTransfered).then(function (filePackageItems)
  {
      res.send(filePackageItems);
  }).catch(function (err){
      console.log("error")
      console.log(err);
      res.send(err);
  })
})

router.get('/file/:id', function (req, res){
    let id = req.params.id;
    FilePackageItemLogic.findByFileId(id).then(function (filePackageItems)
    {
        res.send(filePackageItems);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    FilePackageItemLogic.get(id).then(function (filePackageItem)
    {
      res.send(filePackageItem);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})




router.post('/update/:id', function (req, res){
  let filePackageItem = req.body;
  let id = req.params.id;

  FilePackageItemLogic.update(id, filePackageItem).then(function (filePackageItem)
  {
    res.send(filePackageItem);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.post('/update-istransfered/:isTransfered', function (req, res){
  let isTransfered = req.params.isTransfered;
  let ids = req.body.ids;

  FilePackageItemLogic.updateIsTransfered(ids, isTransfered).then(function (filePackageItems)
  {
    res.send(filePackageItems);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  FilePackageItemLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/delete-by-uploadid/:id', function (req, res){
  let id = req.params.id;

  FilePackageItemLogic.deleteByUploadId(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;
