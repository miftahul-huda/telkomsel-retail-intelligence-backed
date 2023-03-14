var express = require('express');
var router = express.Router();

router.get('', function (req, res){
    let version = process.env.VERSION;
    let environment = process.env.DEPLOYMENT;

    res.send({
        version: version,
        environment: environment
    })
})





module.exports = router;
