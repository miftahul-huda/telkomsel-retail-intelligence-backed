var jwt = require('jsonwebtoken');

function  jwtAuth(req, res, next)
{

    if(req.originalUrl.indexOf("application") > -1 )
        return next();

    // Implement the middleware function based on the options object
    try{

        let token =
        req.body.token || req.query.token || req.headers["authorization"];

    
        if (!token) {
            return res.status(403).send({ success: false, message: "A token is required for authentication"});
        }

        token = token.replace("Bearer", "");
        token = token.trim();

        if (!token) {
            return res.status(403).send({ success: false, message: "A token is required for authentication"});
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET);    
        req.data = decoded;
        
    }
    catch(err)
    {
        console.log('error')
        console.log(err)
        return res.status(404).json({
            success: false,
            message: "Invalid token",
            error: err
        });
    }

    return next();
}


module.exports = jwtAuth;