var express = require('express');
var router = express.Router();

const OperatorLogic = require("../modules/logic/operatorlogic");


router.get('/', function (req, res){

  OperatorLogic.findAll().then(function (operators)
  {
    console.log(operators);
    res.send(operators);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    OperatorLogic.get(id).then(function (Operator)
    {
      res.send(Operator);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    OperatorLogic.findByKeyword(keyword).then(function (Operators)
    {
      res.send(Operators);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
