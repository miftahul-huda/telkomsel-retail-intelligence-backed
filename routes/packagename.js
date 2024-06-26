var express = require('express');
var router = express.Router();

const PackageNameLogic = require('../modules/logic/packagenamelogic')

/* GET Packages listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:operatorcode', function (req, res){

  let operatorCode = req.params.operatorcode;
  PackageNameLogic.findAll(operatorCode).then(function (packages)
  {
    res.send(packages);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})



router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    PackageNameLogic.get(id).then(function (package)
    {
      res.send(package);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    PackageNameLogic.findByKeyword(keyword).then(function (packages)
    {
      res.send(packages);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
