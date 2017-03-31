var error = require('../model/error.js');
var allow = function(req, res, next){

    var obj = req.decoded;

    if(obj && obj.role) {
        if(obj.role === "admin") {
            next();
        }
        else if(req.params.id !== req.decoded.id){
            res.status(403).json(error.UnAuthorizedToken);
            return;
        }
        else {
            next();
        }
    }
    else {
        //not authorized
        res.status(403).json(error.UnAuthorizedToken);
    }
    
};

module.exports = allow;