var express = require('express');
var router = express.Router();
var error = require('../libs/model/error.js');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var type = "User";
var baseUrl = "/api/v1/user/";

router.get('/', function(req, res){
  //get all users
  User.find(function(err, users){
    if(err) {
      res.status(500).json(error.genericError);
    }
    else {
      var resObj = {};
      resObj.href = baseUrl;
      resObj.users = [];
      users.forEach(function(user){
        var userObj = {};
        userObj.href = baseUrl+user._id;
        userObj._type = type;
        userObj.username = user.username;
        resObj.users.push(userObj);

      });
      res.status(200).json(resObj);
      delete resObj;
    }
  });
});

router.post('/',function(req, res){
    var username = req.body.username;
    
    //create a new user
    var nUser = new User({username:username});

    nUser.save(function(err){
      if(err) {
        if(err.name === 'ValidationError') {
          
          res.status(400).json(error.validationError);
        }
        else {
          if(err.code === 11000) {
            res.status(400).json(error.duplicationError);
          }
          else {
            res.status(500).json(error.genericError);
          }
          
        }
      }
      else {//save successful

        var responseObj = {};
        responseObj.username = username;
        responseObj.href = baseUrl+nUser._id;
        responseObj._type = type

        res.status(200).json(responseObj);
        delete responseObj;
      }
    });

    
});

//GET user/:id
router.get('/:id', function(req, res){
    //get particular user resource
    User.findById(req.params.id, function(err, user){
      if(err) {
        res.status(500).json(error.genericError);
        return;
      }

      if(!user) {
        res.status(400).json(error.NoSuchUser);
        return;
      }

      //user
      var responseObj = {};
      responseObj.href = baseUrl+user._id;
      responseObj._type = type;
      responseObj.username = user.username;
      res.status(200).json(responseObj);
      delete responseObj;
      return;
    });

});

//PUT user/:id
//update only what has changed
router.put('/:id', function(req, res){
    //update a user resource
    
    User.findById(req.params.id, function(err, user){

      if(err) {
        res.status(500).json(error.genericError);
      }
      else {
        if(!user) {
          res.status(400).json(error.NoSuchUser);
        }
        else {
          
          user.username = req.body.username || "";

          user.save(function(err){

            if(err) {
                if(err.name === 'ValidationError') {
                  res.status(400).json(error.validationError);
                }
                else {
                  if(err.code === 11000) {
                    res.status(400).json(error.duplicationError);
                  }
                  else {
                    res.status(500).json(error.genericError);
                  }
                  
                }

              }
              else {

                var userObj = {};
                userObj.href = baseUrl+user._id;
                userObj._type=type;
                userObj.username = user.username;
                res.status(200).json(userObj);
                delete userObj;

              }
          });

          //try to save and note that we might have a saving error due to duplicate
          
        }//end of else
      }
    });

});

//DELETE user:id
router.delete('/:id', function(req, res){
    //delete user resource
    User.findByIdAndRemove(req.params.id, function(err, user){
      if(err) {
        res.status(500).json(error.genericError);
      }
      else {
        res.status(204).json();
      }
    });

});

module.exports = router;
