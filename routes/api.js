
var users = require('./users.js');
var errorModel = require('../libs/model/error.js');
var errorRoute = require('./error.js');
var auth = require('./auth.js');
var config = require('../libs/config.js');
var article = require('./article.js');

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
   
    //api/v1/user
    app.use('/api/v1/user', users);

    //api/v1/article
    //get all articles
    //update an article
    //delete an article
    
    app.use('/api/v1/article', article);

    return router;
};
