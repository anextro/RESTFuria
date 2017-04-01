var express = require('express');
var router = express.Router();
var error = require('../libs/model/error.js');
var UserController = require('../libs/controller/user.js');
var ArticleController = require('../libs/controller/article.js');

var auth = require('../libs/controller/auth.js');

var allow = require('../libs/controller/allow.js');




router.get('/', auth, allow, UserController.getUsers);

//every one should be able to create users
router.post('/', UserController.createUser);

//GET user/:id
router.get('/:id', auth, allow, UserController.findUser);

//PUT user/:id
router.put('/:id', auth, allow, UserController.updateUser);

//DELETE user:id
router.delete('/:id', auth, allow, UserController.deleteUser);

/**
 * Article relationship
 */


//any authenticated user can see article
router.get('/:id/article/:aid', auth, ArticleController.getArticle);

//any authenticated user can see
router.get('/:id/article', auth, ArticleController.getUserArticle);

//to update article, you must be the owner
router.put('/:id/article/:aid', auth, allow, ArticleController.updateArticle);

//any authenticated user can create article
router.post('/:id/article', auth, ArticleController.createArticle);

//to delete article, you need to be the owner
router.delete('/:id/article/:aid', auth, allow, ArticleController.deleteArticle);

module.exports = router;
