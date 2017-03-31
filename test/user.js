process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var User = require('../libs/model/user.js');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');
var request = require('request');

var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);



describe('when not authorized', function(){
    var baseUrl = "http://localhost:3000/";
    
    it("it should not be successful without authorization ",function(done){
        chai.request(server)
            .get('/api/v1/user/2')
            .end(function(err, res){
                var responseObj = JSON.parse(err.response.text);
                expect(err.response.status).to.equal(403);
                expect(responseObj.code).to.equal("5005");
                done();
            });
        
    })
    
});

describe("Get all users /user", function(){
    
    //requires and admin user
});

describe("GET /user", function(){
    var token;
    var userId;
    var username = "test-user";
    var aUser;
    before(function(done){
        //insert a new user
        aUser = new User({username: username});
        //save in mongodb
        aUser.save(function(err){
            if(err) {
                console.log("failed to save user "+JSON.stringify(err));
                done();
            }
            else{
                //get access token to use for each test
                userId = aUser._id;
                chai.request(server)
                .post('/api/v1/authenticate')
                .send({username:username})
                .end(function(err, res){
                    //console.log(JSON.stringify(res));
                    var responseObj = JSON.parse(res.text);
                    token = responseObj.token;
                    done();
                });

            }
            
        });
    });
    after(function(done){
        //delete that user
        console.log("after all hook");
        User.remove({}, function(err){
            if(err) {
                console.log("failed to remove user");
            }
            else{
                console.log("user removed");
            }
            done();
        });
    });
    
    it("it should return a single user instance ", function(done){
        //do nothing
        chai.request(server)
        .get("/api/v1/user/"+userId)
        .set('x-access-token', token)
        .end(function(err, res){
            var responseObj = JSON.parse(res.text);
            expect(responseObj.username).to.equal(username);
            done();
        });
    });


    
    it("it should update user detail", function(done){
        var testUserName="martins";
        chai.request(server)
        .put("/api/v1/user/"+userId)
        .set('x-access-token', token)
        .send({username:testUserName})
        .end(function(err, res){
            var responseObj = JSON.parse(res.text);
            expect(responseObj.username).to.equal(testUserName);
            done();
        });
    });

    it("it should create a new user ",function(done){
        var testUserName = "create";
        chai.request(server)
        .post("/api/v1/user")
        .send({username:testUserName})
        .end(function(err, res){
            var responseObj = JSON.parse(res.text);
            expect(responseObj.username).to.equal(testUserName);
            done();
        });
    });

    it("delete user instance ",function(done){
        chai.request(server)
        .delete("/api/v1/user/"+userId)
        .set('x-access-token', token)
        .end(function(err, res){
            expect(res.status).to.equal(204);
            done();
        });
    });
    
});


describe("GET all users /user", function(){

    var username="admin-user";
    var adminId;
    var token;

    before(function(done){
        var admin = new User({username:username,role:"admin"});

        //save admin user
        admin.save(function(err){
            if(err) {
                console.log("Failed to save admin to database");
            }
            else {
                adminId = admin._id;
                chai.request(server)
                .post("/api/v1/authenticate")
                .send({username:username})
                .end(function(err, res){
                    if(err) {
                        console.log("error in getting admin token");
                        console.log("admin request "+JSON.stringify(err));
                    }
                    else{
                        var responseObj = JSON.parse(res.text);
                        token = responseObj.token;
                    }
                    
                    done();
                });
            }
        });
    });
    after(function(done){
        User.remove({}, function(err){
            if(err) {
                console.log("failed to remove  admin user");
            }
            else{
                console.log("user admin removed");
            }
            done();
        });
    });

    it("it should not get all the users without access token ", function(done){
        //
        chai.request(server)
        .get("/api/v1/user")
        .end(function(err, res){
            if(err) {
                var error = JSON.parse(err.response.text);
                expect(error.code).to.equal("5005");
            }
            else {
                expect(1).to.equal(2); //this should never be executed, if it is then something is wrong
            }
            done();
        });
        
    });
    it("it should get all the users in the User table ",function(done){
        //
        chai.request(server)
        .get("/api/v1/user")
        .set('x-access-token', token)
        .end(function(err, res){
            if(err) {
                console.log("failed to get users "+JSON.stringify(err));
            }
            else{
                var responseObj = JSON.parse(res.text);
                expect((responseObj.users instanceof Array)).to.equal(true);
            }
            done();
        })
        
    });
});
