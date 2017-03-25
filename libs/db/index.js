var mongoose = require('mongoose');
var config = require('../config.js');

mongoose.connect(config.mongodb.uri);

var db = mongoose.connection;

db.on('error',function(err){
    console.log("An error opening database connection "+JSON.stringify(err));
    process.exit(1);
});

db.once('open', function(){
    console.log("database connection open");
});

require('../model/user.js');