var express = require('express');
var router = express.Router();

const ItemSubCategoryLogic = require('../modules/logic/itemsubcategorylogic')

/*
router.post('/create', function (req, res){
    let itemSubCategory = req.body;
    console.log("itemSubCategory")
    console.log(itemSubCategory)

    ItemSubCategoryLogic.create(itemSubCategory).then(function (itemSubCategory)
    {
        res.send(itemSubCategory);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})
*/

router.get('', function (req, res){

  ItemSubCategoryLogic.findAll().then(function (itemSubCategorys)
    {
        res.send(itemSubCategorys);
    }).catch(function (err){
        console.log("error")
        console.log(err);
        res.send(err);
    })
})


router.get('/packageitem/:id', function (req, res){
    let id = req.params.id;
    ItemSubCategoryLogic.findByPackageItemId(id).then(function (itemSubCategorys)
    {
        res.send(itemSubCategorys);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    ItemSubCategoryLogic.get(id).then(function (itemSubCategory)
    {
      res.send(itemSubCategory);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})




router.post('/update/:id', function (req, res){
  let itemSubCategory = req.body;
  let id = req.params.id;

  ItemSubCategoryLogic.update(id, itemSubCategory).then(function (itemSubCategory)
  {
    res.send(itemSubCategory);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  ItemSubCategoryLogic.delete(id, itemSubCategory).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete-by-packageitem/:id', function (req, res){
  let id = req.params.id;

  ItemSubCategoryLogic.deleteByPackageItemId(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

module.exports = router;
