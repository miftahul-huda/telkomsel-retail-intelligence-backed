var express = require('express');
var router = express.Router();

const UserLogic = require('../modules/logic/userlogic')


router.post('/register', function (req, res){
    let user = req.body;
    let fullName  = user.fullname;
    let firstnames = fullName.split(" ");
    let lastname = "";
    if(firstnames.length >= 1)
        firstname = firstnames[0];
    if(firstnames.length >= 2)
        lastname = firstnames[1];
    user.firstname = firstname;
    user.lastname = lastname;

    UserLogic.register(user).then(function (saveduser)
    {
        res.send(saveduser);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/', function (req, res){

    UserLogic.findAll().then(function (users)
    {
        res.send(users);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    UserLogic.get(id).then(function (user)
    {
      res.send(user);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    UserLogic.findByKeyword(keyword).then(function (users)
    {
      res.send(users);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.post('/login', function (req, res){
    let user = req.body;
  
    UserLogic.login(user.email, user.password).then(function (saveduser)
    {
      res.send(saveduser);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
  })

router.post('/update/:id', function (req, res){
  let user = req.body;
  let id = req.params.id;

  UserLogic.update(id, user).then(function (saveduser)
  {
    res.send(saveduser);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  UserLogic.delete(id, user).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
