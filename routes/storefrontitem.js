var express = require('express');
var router = express.Router();

const StoreFrontItemLogic = require('../modules/logic/storefrontitemlogic')


router.post('/create', function (req, res){
    let stroreFrontItem = req.body;

    StoreFrontItemLogic.create(stroreFrontItem).then(function (stroreFrontItem)
    {
        res.send(stroreFrontItem);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/', function (req, res){

  StoreFrontItemLogic.findAll().then(function (stroreFrontItems)
    {
        res.send(stroreFrontItems);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/transfered/:isTransfered', function (req, res){

  let isTransfered = req.params.isTransfered;
  StoreFrontItemLogic.findByIsTransfered(isTransfered).then(function (stroreFrontItems)
  {
      res.send(stroreFrontItems);
  }).catch(function (err){
      console.log("error")
      res.send(err);
  })
})

router.get('/file/:id', function (req, res){
    let id = req.params.id;
    StoreFrontItemLogic.findByFileId(id).then(function (stroreFrontItems)
    {
        res.send(stroreFrontItems);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    StoreFrontItemLogic.get(id).then(function (stroreFrontItem)
    {
      res.send(stroreFrontItem);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})




router.post('/update/:id', function (req, res){
  let stroreFrontItem = req.body;
  let id = req.params.id;

  StoreFrontItemLogic.update(id, stroreFrontItem).then(function (stroreFrontItem)
  {
    res.send(stroreFrontItem);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update-istransfered/:isTransfered', function (req, res){
  let isTransfered = req.params.isTransfered;
  let ids = req.body.ids;

  StoreFrontItemLogic.updateIsTransfered(ids, isTransfered).then(function (stroreFrontItems)
  {
    res.send(stroreFrontItems);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  StoreFrontItemLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete-by-uploadid/:id', function (req, res){
  let id = req.params.id;

  StoreFrontItemLogic.deleteByUploadId(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;
