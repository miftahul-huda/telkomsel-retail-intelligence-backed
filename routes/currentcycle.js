var express = require('express');
var router = express.Router();

const CurrentCycleLogic = require('../modules/logic/currentcyclelogic')

/* GET applications listing. */
router.get('', function(req, res, next) {

  CurrentCycleLogic.findByActive(1).then(function (cycle)
  {
    res.send(cycle);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
});


module.exports = router;
