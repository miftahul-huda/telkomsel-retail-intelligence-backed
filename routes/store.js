var express = require('express');
var router = express.Router();

const StoreLogic = require("../modules/logic/storelogic");


router.post('/add', function (req, res){
  let store = req.body;

  StoreLogic.create(store).then(function (result)
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

  StoreLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/', function (req, res){

  StoreLogic.findAll().then(function (stores)
  {
    console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    StoreLogic.get(id).then(function (store)
    {
      res.send(store);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
    console.log("search:")
    console.log(keyword)
  
    StoreLogic.findByKeyword(keyword).then(function (Stores)
    {
      res.send(Stores);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
