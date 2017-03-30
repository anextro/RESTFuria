
var dbName = function(){
    if(process.env.NODE_ENV === "test") return "testdb";
    else return "dbrest";
};
exports.mongodb = {
    uri: 'mongodb://localhost:27017/'+dbName()
};

exports.secret = 'lifeiseasyifyouthinkso'