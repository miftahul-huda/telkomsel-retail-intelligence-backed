var express = require('express');
var router = express.Router();

const SubOperatorLogic = require('../modules/logic/suboperatorlogic')

/* GET SubOperators listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:operatorcode', function (req, res){

  let operatorCode = req.params.operatorcode;
  SubOperatorLogic.findAll(operatorCode).then(function (subOperators)
  {
    res.send(subOperators);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    SubOperatorLogic.get(id).then(function (subOperator)
    {
      res.send(subOperator);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    SubOperatorLogic.findByKeyword(keyword).then(function (subOperators)
    {
      res.send(subOperators);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
