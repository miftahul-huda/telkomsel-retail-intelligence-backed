var express = require('express');
var router = express.Router();

const CitySRPLogic = require("../modules/logic/citysrplogic");


router.get('/:packagename/:outletid', function (req, res){
  let package_name = req.params.packagename;
  let outletid = req.params.outletid;

  CitySRPLogic.findByPackageNameAndOutlet(package_name, outletid).then(function (result)
  {
      res.send(result);
  }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
  })
})



module.exports = router;
