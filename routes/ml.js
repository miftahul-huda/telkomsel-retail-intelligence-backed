var express = require('express');
var router = express.Router();

const MlLogic = require('../modules/logic/mllogic')

router.post('/dominant-operator', function (req, res){
  let url = req.body.url;
  MlLogic.ml_getColorPercentage(url).then(function (areas)
  {
    res.send(areas);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;