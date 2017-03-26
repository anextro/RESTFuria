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