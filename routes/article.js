var express = require('express');
var router = express.Router();
var auth = require('../libs/controller/auth.js');

var allow = require('../libs/controller/allow.js');
var ArticleController = require('../libs/controller/article.js');

router.get('/', auth, ArticleController.getAll);

module.exports = router;
