// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
var graphqlHTTP = require('express-graphql');
var expressjwt = require('express-jwt');
var schemaUser=require('./schema/schemaUser');
var models = require('./models');

// Instantiate server
var server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static('public'));

const SECRET = 'say';

const auth = expressjwt({
    secret: SECRET,
    credentialsRequired: false,
  });

  server.get('/graphql', function (req, res) {

  res.setHeader('Content-Type', 'text/html');
  res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Welcome to SAY GRAPHQL !</title>'+
'    </head>'+ 
'    <body>'+
'      <h1>Welcome to SAY GraphQL</h1>'+
'      <h2><a href="http://localhost:4000/graphql/users"><strong>Users</strong></a></h2>'+
'    </body>'+
'</html>');
});

server.use(
    '/graphql/users',
    bodyParser.json(),
    auth, 
    graphqlHTTP(req => ({
        schema : schemaUser,
        context: {
          models,
          SECRET,
          user: req.user,
        },
        graphiql: true  
      })
    ));

server.listen(4000, () => console.log('GraphQl on localhost:4000/graphql'));
