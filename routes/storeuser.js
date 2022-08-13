var express = require('express');
var router = express.Router();

const StoreUserLogic = require("../modules/logic/storeuserlogic");


router.get('/check/:user/:sfcode/:storeid', function (req, res){
  let user = req.params.user;
  let storeid = req.params.storeid; 
  let sfcode  = req.params.sfcode;

  StoreUserLogic.findByUserAndStoreID(user, sfcode, storeid).then(function (result)
  {
      res.send(result);
  }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
  })
})


router.post('/add', function (req, res){
  let storeUser = req.body;

  StoreUserLogic.create(storeUser).then(function (result)
  {
      res.send(result);
  }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
  })
})



module.exports = router;
