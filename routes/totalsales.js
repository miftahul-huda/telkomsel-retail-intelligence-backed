var express = require('express');
var router = express.Router();

const TotalSalesLogic = require("../modules/logic/totalsaleslogic");


router.post('/add', function (req, res){
  let totalSales = req.body;

  TotalSalesLogic.create(totalSales).then(function (result)
  {
      res.send(result);
  }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let totalSales = req.body;
  let id = req.params.id;

  TotalSalesLogic.update(id, totalSales).then(function (result)
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

  TotalSalesLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('', function (req, res){

  TotalSalesLogic.findAll().then(function (totalSales)
  {
    res.send(totalSales);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    TotalSalesLogic.get(id).then(function (totalSales)
    {
      res.send(totalSales);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/file/:id', function (req, res){
  let id = req.params.id;
  TotalSalesLogic.findByFileId(id).then(function (totalSales)
  {
      res.send(totalSales);
  }).catch(function (err){
      console.log("error")
      res.send(err);
  })
})

module.exports = router;
