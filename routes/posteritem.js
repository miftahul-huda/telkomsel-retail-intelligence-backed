var express = require('express');
var router = express.Router();

const PosterItemLogic = require('../modules/logic/posteritemlogic')


router.post('/create', function (req, res){
    let posteritem = req.body;
    console.log("posteritem")
    console.log(posteritem)

    PosterItemLogic.create(posteritem).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/', function (req, res){

  PosterItemLogic.findAll().then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})



router.get('/file/:id', function (req, res){
    let id = req.params.id;
    PosterItemLogic.findByFileId(id).then(function (result)
    {
        res.send(result);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    PosterItemLogic.get(id).then(function (result)
    {
      res.send(result);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})




router.post('/update/:id', function (req, res){
  let posterItem = req.body;
  let id = req.params.id;

  PosterItemLogic.update(id, posterItem).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  PosterItemLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete-by-uploadid/:id', function (req, res){
  let id = req.params.id;

  PosterItemLogic.deleteByUploadId(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;
