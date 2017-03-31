var errorModel = require('../model/error.js');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var auth = function(req, res, next){
    var token = req.body.accessToken || req.query.accessToken || req.headers['x-access-token'];
        console.log(token);
        if(token) {
            
            jwt.verify(token, config.secret, function(err, decoded) {
                if(err) {//invalid token
                    res.status(403).json(errorModel.InvalidToken);
                    
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            res.status(403).json(errorModel.NoToken);
           
        }
        
};

module.exports = auth;