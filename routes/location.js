var express = require('express');
var router = express.Router();

const LocationLogic = require('../modules/logic/locationlogic')


router.get('/provinces', function (req, res){
  LocationLogic.findAllProvinces().then(function (provinces)
  {
    res.send(provinces);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})



router.get('/cities', function (req, res){
  let province = req.query.province;
  let region = req.query.region;

  if(province != null)
  {
    LocationLogic.findAllCitiesByProvince(province).then(function (cities)
    {
      res.send(cities);
    }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
    })
  }
  else if(region != null)
  {
    LocationLogic.findAllCitiesByRegion(region).then(function (cities)
    {
      res.send(cities);
    }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
    })    
  }
  else
  {
    res.send({ success: false, message: "No region of province parameter is specified" }); 
  }

})

router.get('/district/:city', function (req, res){
  let city = req.params.city;
  LocationLogic.findAllDistrictsByCity(city).then(function (districts)
  {
    res.send(districts);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/villages/:district', function (req, res){
  let district = req.params.district;
  LocationLogic.findAllVillagesByDistrict(district).then(function (villages)
  {
    res.send(villages);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/regions/:area', function (req, res){
  let area = req.params.area;
  LocationLogic.findAllRegionsByArea(area).then(function (regions)
  {
    res.send(regions);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})

router.get('/areas', function (req, res){
  LocationLogic.findAllAreas().then(function (areas)
  {
    res.send(areas);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})


module.exports = router;