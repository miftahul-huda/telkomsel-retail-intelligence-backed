var express = require('express');
var router = express.Router();

const KeyValueItemLogic = require("../modules/logic/keyvalueitemlogic");


router.post('/add', function (req, res){
  let item = req.body;

  KeyValueItemLogic.create(item).then(function (result)
  {
      res.send(result);
  }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  KeyValueItemLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/tag/:tag', function (req, res){

  let tag = req.params.tag;
  KeyValueItemLogic.findAll(tag).then(function (items)
  {
    console.log(items);
    res.send(items);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    KeyValueItemLogic.get(id).then(function (item)
    {
      res.send(item);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

module.exports = router;
