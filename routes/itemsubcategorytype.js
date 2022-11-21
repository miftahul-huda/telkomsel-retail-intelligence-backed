var express = require('express');
var router = express.Router();

const ItemSubCategoryTypeLogic = require('../modules/logic/itemsubcategorytypelogic')


router.post('/create', function (req, res){
    let itemSubCategoryType = req.body;


    ItemSubCategoryTypeLogic.create(itemSubCategoryType).then(function (itemSubCategoryType)
    {
        res.send(itemSubCategoryType);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('', function (req, res){

  ItemSubCategoryTypeLogic.findAll().then(function (itemSubCategoryTypes)
    {
        res.send(itemSubCategoryTypes);
    }).catch(function (err){
        console.log("error")
        console.log(err);
        res.send(err);
    })
})


router.get('/itemsubcategory/:id', function (req, res){
    let id = req.params.id;
    ItemSubCategoryTypeLogic.findByItemSubCategory(id).then(function (itemSubCategoryTypes)
    {
        res.send(itemSubCategoryTypes);
    }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    ItemSubCategoryTypeLogic.get(id).then(function (itemSubCategoryType)
    {
      res.send(itemSubCategoryType);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})




router.post('/update/:id', function (req, res){
  let itemSubCategoryType = req.body;
  let id = req.params.id;

  ItemSubCategoryTypeLogic.update(id, itemSubCategoryType).then(function (itemSubCategoryType)
  {
    res.send(itemSubCategoryType);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  ItemSubCategoryTypeLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete-by-itemsubcategory/:id', function (req, res){
  let id = req.params.id;

  ItemSubCategoryTypeLogic.deleteByItemSubCategoryId(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;
