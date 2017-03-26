# A simple Nodejs RestFul Api

Sample App for trying out RESTFul concepts.

## Running project

You need to have installed Node.js and MongoDB 

### Install dependencies 

To install dependencies enter project folder and run following command:
```
npm install
```
### Run server

To run server execute:
```
npm start 
```

### Get Access tokens

To get an access token, it is assumed that the user already exists.

You can create a new user by using POST /user .

To get an access token, use:

```
POST /api/v1/authenticate 
{
    "username": "***"
}

```


### Sample Requests

Creating and refreshing access tokens:
```
The base url is /api/v1/


GET /user  -> Gets all the user in the data store

POST /user  -> Creates a new user

GET  /user/:id  -> Get a particular user with id = :id

PUT /user/:id -> Updates the user with id = :id

DELETE /user/:id  -> Deletes the user with id = :id

```
