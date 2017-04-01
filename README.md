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

Make sure the mongod server is up and running. Go to the bin directory of your local
mongo installation (in windows => C:\Program Files\MongoDB\Server\3.2\bin ) and run on
the cmd

```
mongod

```

To run the nodejs server execute:

```
npm start 
```

### Get Access tokens

To get an access token, it is assumed that the user already exists.

You can create a new user by using POST /user .

To get an access token,

1. Make a post request :
```
POST /api/v1/user
{
    username: <your_user_name>
}

sample response
{
  "username": "constance",
  "href": "/api/v1/user/58de3ad38fad49b7a02f24e4",
  "_type": "User"
}
```
2. Get authentication token

```
POST /api/v1/authenticate 
{
    "username": <your_user_name>
}

sample response

{
  "_type": "AccessToken",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoiY29uc3RhbmNlIiwiaWQiOiI1OGRlM2FkMzhmYWQ0OWI3YTAyZjI0ZTQiLCJpYXQiOjE0OTA5NTkxMzksImV4cCI6MTQ5MzU1MTEzOX0.koATN022Sdqz_fw5puIc6pJGX2z39uj5bkxAvwtfB0w"
}

```


### Sample Requests

Creating a new user

```
POST /api/v1/user
{
  username: <your_username_here>
}

```

Get a User Resource (Request must come with elevated privileges )

Either the request is from the resource owner or an admin user.

```
GET /api/v1/user/:id

```

Update a User Resouce (Request must come with elevated privileges )

Either the request is from the resource owner or an admin user.

```

PUT /api/v1/user/:id

{
  username: <your_updated_username_here>
}

```

Delete a User Resource (Request must come with elevated privileges )

Either the request is from the resource owner or an admin user.

```
DELETE /api/v1/user/:id

```

GET all Users (Request must come with elevated privileges )

Request must come from an admin user.

```
GET /api/v1/user

```

### How to add an Admin User Resource

1. Add a new user to your runing mongodb with a role="Admin"
2. Use the process of getting a token to get an admin token


### Article Sub Resource (Coming soon)

