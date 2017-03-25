
var users = require('./users.js');
var error = require('./error.js');

module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next){
        res.status(200);
        res.json({
            message: "running"
        });
    });

    //api/v1/error
    app.use('/api/v1/error', error);
    
    //api/v1/user
    app.use('/api/v1/user', users);

    //api/v1/article

    return router;
};
