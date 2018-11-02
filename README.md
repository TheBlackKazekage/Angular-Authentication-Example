# Angular-Authentication-Example
MEAN Stack application showing angular authentication at user login using JWT


##Server
A Mongo DB server setup with API endpoints to create a new user, login and display event posts

On registration and login, a token is sent from the server and stored into local storage. Every request to the server has the token attached to it.
The Special Events for members page is only accessible after the user logs in
