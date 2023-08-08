var express = require('express');
var router = express.Router();

const KeywordLogic = require('../modules/logic/keywordlogic')


router.post('/create', function (req, res){
  let keyword = req.body;
  keyword.keywordDate = new Date();

  KeywordLogic.create(keyword).then(function (savedKeyword)
  {
    res.send(savedKeyword);
  }).catch(function (err){
    console.keyword("error")
    res.send(err);
  })
})

router.get('/', function (req, res){

  KeywordLogic.findAll().then(function (keywords)
  {
    res.send(keywords);
  }).catch(function (err){
    console.keyword("error")
    res.send(err);
  })
})

router.post('/', function (req, res){
  let search = req.body;

  KeywordLogic.findAll(search).then(function (savedKeyword)
  {
    res.send(savedKeyword);
  }).catch(function (err){
    console.keyword("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;

  KeywordLogic.get(id).then(function (keyword)
  {
    res.send(keyword);
  }).catch(function (err){
    console.keyword("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let keyword = req.body;
  let id = req.params.id;

  KeywordLogic.update(id, keyword).then(function (savedKeyword)
  {
    res.send(savedKeyword);
  }).catch(function (err){
    console.keyword("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  KeywordLogic.delete(id, keyword).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.keyword("error")
    res.send(err);
  })
})



module.exports = router;