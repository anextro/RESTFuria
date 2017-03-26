var express = require('express');
var router = express.Router();
var error = require('../libs/model/error.js');
var errorType = "Error";
var baseUrl = "/api/v1/error/";

router.get('/:id', function(req, res){

    var id = req.params.id || -1;
    var resp = {};
    resp._type = errorType;
    resp.href = baseUrl;
    
    res.status(200);
    if(id === "5001") {
        resp.message = "An internal server error means an unknow error occured. Contact system admin";
        resp.href+="5001";
        res.json(resp);
    }
    else if(id === "5002") {

        resp.message = "Validation Error means you have sent a request that is not valid";
        resp.href+="5002";
        res.json(resp);
        
    }
    else if(id === "5003") {
        resp.href+="5003";
        resp.message = "Duplication Error means that a resource already exists with similar data you are trying to insert/update";
        res.json(resp);
        
    }
    else if(id === "5004") {
        resp.href+="5004";
        resp.message = "You are trying to perform an operation on a user resource that does not exist";
        res.json(resp);
        
    }
    else if(id === "5005"){
        resp.href+="5005";
        resp.message = "There is no valid access token in the request";
        res.json(resp);
    }
    else if(id === "5006"){
        resp.href+="5006";
        resp.message = "The access token is invalid or may have expired";
        res.json(resp);
    }
    else if(id === "5007"){
        resp.href+="5007";
        resp.message = "The access token is not authorized to use the resource";
        res.json(resp);
    }
    else {
        
        resp.message = "The Error Type you are looking for is not available";
        res.json(resp);
    }

});
module.exports = router;