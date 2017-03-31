var express = require('express');
var router = express.Router();
var error = require('../libs/model/error.js');
var jwt = require('jsonwebtoken');
var config = require('../libs/config.js');

var mongoose = require('mongoose');

var User = mongoose.model('User');

/**
 *  Authenticate user using just the username for now
 * call this endpoint for new tokens
 */
router.post('/', function(req, res){

    var name = req.body.username || "";
    User.findOne({username: name}, function(err, user){
        
        if(err) {
            res.status(500).json(error.genericError);
        }
        else if(!user) {
            res.status(400).json(error.NoSuchUser);
        }
        else{//user exist
            var payload = {
                role: user.role || "user",
                username: name,
                id: user._id
            };

            var token = jwt.sign(payload, config.secret, {expiresIn:60*60*24*30});

            res.status(200).json({
                _type: "AccessToken",
                token: token
            });
        }

        
    });

});


module.exports = router;