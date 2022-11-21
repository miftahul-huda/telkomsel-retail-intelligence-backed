var express = require('express');
var router = express.Router();

const EtalaseItemLogic = require('../modules/logic/etalaseitemlogic')


router.post('/create', function (req, res){
    let etalaseItem = req.body;


    EtalaseItemLogic.create(etalaseItem).then(function (etalaseItem)
    {
        res.send(etalaseItem);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/', function (req, res){

  EtalaseItemLogic.findAll().then(function (etalaseItems)
    {
        res.send(etalaseItems);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/transfered/:isTransfered', function (req, res){

  let isTransfered = req.params.isTransfered;
  EtalaseItemLogic.findByIsTransfered(isTransfered).then(function (etalaseItems)
  {
      res.send(etalaseItems);
  }).catch(function (err){
      console.log("error")
      res.send(err);
  })
})

router.get('/file/:id', function (req, res){
    console.log("hereee")
    let id = req.params.id;
    EtalaseItemLogic.findByFileId(id).then(function (etalaseItems)
    {
        res.send(etalaseItems);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    EtalaseItemLogic.get(id).then(function (etalaseItem)
    {
      res.send(etalaseItem);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})




router.post('/update/:id', function (req, res){
  let etalaseItem = req.body;
  let id = req.params.id;

  EtalaseItemLogic.update(id, etalaseItem).then(function (etalaseItem)
  {
    res.send(etalaseItem);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update-istransfered/:isTransfered', function (req, res){
  let isTransfered = req.params.isTransfered;
  let ids = req.body.ids;

  EtalaseItemLogic.updateIsTransfered(ids, isTransfered).then(function (etalaseItems)
  {
    res.send(etalaseItems);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  EtalaseItemLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete-by-uploadid/:id', function (req, res){
  let id = req.params.id;

  EtalaseItemLogic.deleteByUploadId(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;
