var express = require('express');
var router = express.Router();
const path = require('path');


router.get('', function (req, res){

    res.redirect("/web/outlets" )
})

router.get('/outlets', function (req, res){
    var appSession = req.session;

    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "outlets");
    res.render(p )
})

router.get('/posters', function (req, res){
    var appSession = req.session;

    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "posters");
    res.render(p )
})

router.get('/storefronts', function (req, res){
    var appSession = req.session;

    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "storefronts");
    res.render(p )
})


module.exports = router;