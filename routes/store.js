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
    res.send(areas);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/kecamatan/:city', function (req, res){

  let city = req.params.city;
  StoreLogic.findAllKecamatan(city).then(function (areas)
  {
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
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/search/by-area/:keyword/:area', function (req, res){
  let keyword = req.params.keyword;
  let area = req.params.area;


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
    res.send(cities);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/by-city/:city', function (req, res){

  let city = req.params.city;

  //city = null;
  StoreLogic.findAllByCity(city).then(function (stores)
  {
    //console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/by-city/nolimit/:city', function (req, res){

  let city = req.params.city;
  //city = null;
  StoreLogic.findAllNoLimitByCity(city).then(function (stores)
  {
    //console.log(stores);
    res.send(stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/search/by-city/:keyword/:city', function (req, res){
  let keyword = req.params.keyword;
  let city = req.params.city;
  //city = null;
  //console.log("search:")
  //console.log(keyword)

  StoreLogic.findByKeywordByCity(keyword, city).then(function (Stores)
  {
    res.send(Stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/search/by-user/:keyword/:user', function (req, res){
  let keyword = req.params.keyword;
  let city = req.params.city;
  //city = null;
  //console.log("search:")
  //console.log(keyword)

  StoreLogic.findByKeywordByCity(keyword, city).then(function (Stores)
  {
    res.send(Stores);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get("/get-generic/:username/:sfcode", function (req, res){
  
  let username = req.params.username;
  let sfcode = req.params.sfcode;

  StoreLogic.findByUserOrSFCode(username, sfcode).then(function (Stores)
  {
    res.send(Stores);
  }).catch(function (err){
    console.log("error /get-generic/:username/:sfcode")
    console.log(err)
    res.send(err);
  })
})

router.get("/get-generic/search/:username/:sfcode/:keyword", function (req, res){
  let username = req.params.username;
  let sfcode = req.params.sfcode;
  let keyword = req.params.keyword;

  StoreLogic.findByUserOrSFCodeAndKeyword(username, sfcode, keyword).then(function (Stores)
  {
    res.send(Stores);
  }).catch(function (err){
    console.log("error /get-generic/search/:username/:sfcode/:keyword")
    console.log(err)
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
    //console.log("search:")
    //console.log(keyword)
  
    StoreLogic.findByKeyword(keyword).then(function (Stores)
    {
      res.send(Stores);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
