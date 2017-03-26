var mongoose = require('mongoose');
var User = mongoose.model('User');
var error = require('../model/error.js');

var type = "User";
var baseUrl = "/api/v1/user/";

exports.getUsers = function(req, res){

    var payload = req.decoded;

    //only admin role can access this resource
    if(payload.role !== "admin") {
        res.status(403).json(error.UnAuthorizedToken);
        return;
    }
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
};

exports.createUser = function(req, res){

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

};

exports.findUser = function(req, res){

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

};

exports.updateUser = function(req, res) {

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

};

exports.deleteUser = function(req, res) {

    //delete user resource
    User.findByIdAndRemove(req.params.id, function(err, user){
      if(err) {
        res.status(500).json(error.genericError);
      }
      else {
        res.status(204).json();
      }
    });
};