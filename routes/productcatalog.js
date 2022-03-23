var express = require('express');
var router = express.Router();

const ProductCatalogLogic = require('../modules/logic/productcataloglogic')


router.post('/create', function (req, res){
  let log = req.body;
  log.logDate = new Date();

  ProductCatalogLogic.create(log).then(function (savedLog)
  {
    res.send(savedLog);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  ProductCatalogLogic.findAll().then(function (logs)
  {
    res.send(logs);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/find-by-operator/:operator', function (req, res){

    let operator = req.params.operator;

    ProductCatalogLogic.findByOperator(operator).then(function (logs)
    {
      res.send(logs);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/find-by-operator-packagetype/:operator/:packagetype', function (req, res){

    let operator = req.params.operator;
    let packageType = req.params.packagetype;

    ProductCatalogLogic.findByOperatorAndPackageType(operator, packageType).then(function (logs)
    {
      res.send(logs);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/find-by-operator/:operator/:packagetype/:packagename', function (req, res){

    let operator = req.params.operator;
    let packageType = req.params.packagetype;
    let packageName = req.params.packagename;

    ProductCatalogLogic.findByOperatorAndPackageTypeAndPackageName(operator, packageType, packageName).then(function (logs)
    {
      res.send(logs);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.post('/', function (req, res){
  let search = req.body;

  ProductCatalogLogic.findAll(search).then(function (savedLog)
  {
    res.send(savedLog);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;

  ProductCatalogLogic.get(id).then(function (log)
  {
    res.send(log);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let log = req.body;
  let id = req.params.id;

  ProductCatalogLogic.update(id, log).then(function (savedLog)
  {
    res.send(savedLog);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  ProductCatalogLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
