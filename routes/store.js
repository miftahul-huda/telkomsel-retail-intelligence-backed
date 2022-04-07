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

router.get('', function (req, res){

  StoreLogic.findAll().then(function (stores)
  {
    console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/nolimit', function (req, res){

  StoreLogic.findAllNoLimit().then(function (stores)
  {
    console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/area', function (req, res){

  StoreLogic.findAllArea().then(function (areas)
  {
    console.log(areas);
    res.send(areas);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/by-area/:area', function (req, res){

  let area = req.params.area;
  StoreLogic.findAll(area).then(function (stores)
  {
    console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/by-area/nolimit/:area', function (req, res){

  let area = req.params.area;
  StoreLogic.findAllNoLimit(area).then(function (stores)
  {
    console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/search/by-area/:keyword/:area', function (req, res){
  let keyword = req.params.keyword;
  let area = req.params.area;
  console.log("search:")
  console.log(keyword)

  StoreLogic.findByKeyword(keyword, area).then(function (Stores)
  {
    res.send(Stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


//=============
router.get('/city', function (req, res){

  StoreLogic.findAllCity().then(function (cities)
  {
    console.log(cities);
    res.send(cities);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/by-city/:city', function (req, res){

  let city = req.params.city;
  StoreLogic.findAllByCity(city).then(function (stores)
  {
    console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/by-city/nolimit/:city', function (req, res){

  let city = req.params.city;
  StoreLogic.findAllNoLimitByCity(city).then(function (stores)
  {
    console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/search/by-city/:keyword/:city', function (req, res){
  let keyword = req.params.keyword;
  let city = req.params.city;
  console.log("search:")
  console.log(keyword)

  StoreLogic.findByKeywordByCity(keyword, city).then(function (Stores)
  {
    res.send(Stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

//==============


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
