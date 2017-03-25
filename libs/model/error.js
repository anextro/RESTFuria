var errorType = "Error";
var baseUrl = "/api/v1/error/";
exports.genericError = 
{
    _type: errorType,
    message: "Internal Server Error",
    code: "5001",
    "more info" :baseUrl+"5001"
}

exports.validationError = {
    _type: errorType,
    message: "Validation Error",
    code: "5002",
    "more info" :baseUrl+"5002"
};

exports.duplicationError = {
    _type: errorType,
    message: "Duplication Error",
    code: "5003",
    "more info" :baseUrl+"5003"
};

exports.NoSuchUser = {
    _type: errorType,
    message: "No Such User",
    code: "5004",
    "more info" :baseUrl+"5004"
};