var express = require('express');
var router = express.Router();

const FilePackageSubItemLogic = require('../modules/logic/filepackagesubitemlogic')


router.post('/create', function (req, res){
    let filePackageSubItem = req.body;
    console.log("filePackageSubItem")
    console.log(filePackageSubItem)

    FilePackageSubItemLogic.create(filePackageSubItem).then(function (filePackageSubItem)
    {
        res.send(filePackageSubItem);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('', function (req, res){

  FilePackageSubItemLogic.findAll().then(function (filePackageSubItems)
    {
        res.send(filePackageSubItems);
    }).catch(function (err){
        console.log("error")
        console.log(err);
        res.send(err);
    })
})


router.get('/transfered/:isTransfered', function (req, res){

  let isTransfered = req.params.isTransfered;
  FilePackageSubItemLogic.findByIsTransfered(isTransfered).then(function (filePackageSubItems)
  {
      res.send(filePackageSubItems);
  }).catch(function (err){
      console.log("error")
      console.log(err);
      res.send(err);
  })
})

router.get('/packageitem/:id', function (req, res){
    let id = req.params.id;
    FilePackageSubItemLogic.findByPackageItemId(id).then(function (filePackageSubItems)
    {
        res.send(filePackageSubItems);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    FilePackageSubItemLogic.get(id).then(function (filePackageSubItem)
    {
      res.send(filePackageSubItem);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})




router.post('/update/:id', function (req, res){
  let filePackageSubItem = req.body;
  let id = req.params.id;

  FilePackageSubItemLogic.update(id, filePackageSubItem).then(function (filePackageSubItem)
  {
    res.send(filePackageSubItem);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update-istransfered/:isTransfered', function (req, res){
  let isTransfered = req.params.isTransfered;
  let ids = req.body.ids;

  FilePackageSubItemLogic.updateIsTransfered(ids, isTransfered).then(function (filePackageSubItems)
  {
    res.send(filePackageSubItems);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  FilePackageSubItemLogic.delete(id, filePackageSubItem).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete-by-packageitem/:id', function (req, res){
  let id = req.params.id;

  FilePackageSubItemLogic.deleteByPackageItemId(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;
