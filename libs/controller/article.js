var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var error = require('../model/error.js');
var validator = require('../validator/article.js');

var type = "Article";
var baseUrl = "/api/v1/user/";
var subpath = "/article/";

exports.getAll = function(req, res){
    Article.find({}, function(err, articles){
        if(err) {
            res.status(500).json(error.genericError);
        }
        else if(!articles || articles.length == 0) {
            res.status(200).json({});
        }
        else {

            var obj = [];
            var item;
            articles.forEach(function(article){
                item = {
                    _type:type,
                    href: baseUrl+article.owner+subpath+article._id,
                    title: article.title,
                    content: article.content
                };

                obj.push(item);
            });

            
            res.status(200).json({
                _type: type,
                href: "/api/v1/article",
                articles: obj
            });
        }
    });
};

exports.getArticle = function(req, res){

    var userId = req.params.id;
    var articleId = req.params.aid;

    Article.find({owner: userId, _id: articleId}, function(err, articles){
        if(err) {
            res.status(500).json(error.genericError);
        }
        else if(!articles || articles.length == 0) {
            //no such article
            res.status(200).json({});
        }
        else {

            
            var obj = {
                _type:type,
                href: baseUrl+userId+subpath+articleId,
                title: articles[0].title,
                content: articles[0].content
            };
            res.status(200).json(obj);
        }
    });
};

exports.getUserArticle = function(req, res){

    var userId = req.params.id;

    Article.find({owner: userId}, function(err, articles){
        if(err) {
            res.status(500).json(error.genericError);
        }
        else if(!articles || articles.length == 0) {
            res.status(200).json({});
        }
        else {

            var obj = [];
            var item;
            articles.forEach(function(article){

                item = {
                    _type:type,
                    href: baseUrl+userId+subpath+article._id,
                    title: article.title,
                    content: article.content
                };

                obj.push(item);
                
            });

            res.status(200).json({
                _type: type,
                href: baseUrl+userId+subpath,
                articles: obj
            });

            delete obj;
        }
    });

};

exports.updateArticle = function(req, res){
   
   var userId = req.params.id;
   var articleId = req.params.aid;

   var title = req.body.title || "";
   var content = req.body.content || "";


   Article.find({owner: userId, _id: articleId}, function(err, articles){

       if(err) {
           res.status(500).json(error.genericError);
       }
       else if(!articles || articles.length == 0) {
           res.status(200).json({});
       }
       else {

           var val = articles[0];

           if(title.length > 0) val.title = title; //only do valid updates

           if(content.length > 0) val.content = content; //only do valid updates

           //save result

           val.save(function(err){
               if(err) {
                   res.status(500).json(error.genericError);
               }
               else {
                   var obj = {
                        _type:type,
                        href: baseUrl+userId+subpath+val._id,
                        title: val.title,
                   };

                   res.status(200).json(obj);
               }
           });
       }
   });
};

exports.createArticle = function(req, res){

    var userId = req.params.id;
    var title = req.body.title;
    var content = req.body.content;

    if(!validator({title:title, content:content})) {
        //return error of type validator error
        res.status(400).json(error.ArticleError);
        return;
    }

    
    var article = new Article({
        title: title,
        content: content,
        owner: userId
    });

    article.save(function(err){
        
        if(err) {
            //some db error
            res.status(500).json(error.genericError);
        }
        else {
            //article created
            res.status(200).json({
                _type:type,
                href: baseUrl+userId+subpath+article._id,
                title: article.title     
            });
        }
    });
};

exports.deleteArticle = function(req, res){

    var userId = req.params.id;
    var articleId = req.params.aid;

    Article.remove({owner: userId, _id: articleId}, function(err, articles){
        if(err) {
            res.status(500).json(error.genericError);
        }
        else {
            res.status(204).json();
        }
    });
};