var express = require('express');
var router = express.Router();
var error = require('../libs/model/error.js');
var UserController = require('../libs/controller/user.js');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var type = "User";
var baseUrl = "/api/v1/user/";

router.get('/', UserController.getUsers);

router.post('/', UserController.createUser);

//GET user/:id
router.get('/:id', UserController.findUser);

//PUT user/:id
router.put('/:id', UserController.updateUser);

//DELETE user:id
router.delete('/:id', UserController.deleteUser);

module.exports = router;
