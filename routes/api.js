
var users = require('./users.js');
var errorModel = require('../libs/model/error.js');
var errorRoute = require('./error.js');
var auth = require('./auth.js');
var jwt = require('jsonwebtoken');
var config = require('../libs/config.js');

module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next){
        res.status(200);
        res.json({
            message: "running"
        });
    });

    app.use('/api/v1/authenticate', auth);

    //api/v1/error
    app.use('/api/v1/error', errorRoute);

    //authentication middleware
   app.use(function(req, res, next){
        var token = req.body.accessToken || req.query.accessToken || req.headers['x-access-token'];

        if(token) {
            
            jwt.verify(token, config.secret, function(err, decoded) {
                if(err) {//invalid token
                    res.status(403).json(errorModel.InvalidToken);
                }
                else {
                    req.decoded = decoded;
                    next();
                }
                console.log(JSON.stringify(decoded));
            });
        }
        else {
            
            res.status(403).json(errorModel.NoToken);
        }
        
    });

    //api/v1/user
    app.use('/api/v1/user', users);

    //api/v1/article

    return router;
};
