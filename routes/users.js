var express = require('express');
var router = express.Router();
var error = require('../libs/model/error.js');
var UserController = require('../libs/controller/user.js');

var auth = require('../libs/controller/auth.js');

var allow = require('../libs/controller/allow.js');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var type = "User";
var baseUrl = "/api/v1/user/";


router.get('/', auth, allow, UserController.getUsers);

//every one should be able to create users
router.post('/', UserController.createUser);

//GET user/:id
router.get('/:id', auth, allow, UserController.findUser);

//PUT user/:id
router.put('/:id', auth, allow, UserController.updateUser);

//DELETE user:id
router.delete('/:id', auth, allow, UserController.deleteUser);

module.exports = router;
