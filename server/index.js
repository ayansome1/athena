'use strict';
/* global require*/
/* global process, console, authenticated */
/* jshint node: true */
var express = require('express');
var http = require('http');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
var _ = require('underscore');
var config = require('./config/config.js');
var bodyParser = require('body-parser');
let q = require('q');
// let winston= require('winston');

// var slackLogger = require('slackLogger');
// winston.add(slackLogger, {
//     level: 'error',
//     moduleName: 'athenaPortal'
// });

var connInfo = config.sqlconn;

app.use(cors({
    origin: [config.athena.corsorigin],
    credentials: true
}));


app.use(bodyParser.json()); // to support JSON-encoded bodies

if (!process.env.NODE_ENV) {
    app.use(require('morgan')('dev'));
}

// function checkIfAccessTokenValid(accessToken) {
// 	let deferred = q.defer();
// 	let connection = mysql.createConnection(connInfo);
//     let query = "Select * from fdausers where accessToken = ? ;";
//     connection.query(query, [accessToken], (err, result) => {
//         if (err) {
//             deferred.reject(err);
//         }
        
//         else if (_.isEmpty(result)) {

//             deferred.resolve({isValidUser: false});
//         }
//         else{
//             deferred.resolve({user: result[0], isValidUser: true});

//         }

//     });

//     connection.end();
//     return deferred.promise;
// }

// function auth(req,res,next) {

// 	let accessToken = req.get('access-token');
// 	if(accessToken) {
// 		checkIfAccessTokenValid(accessToken).then(function(data){


// 			if(data.isValidUser){
// 				req.user = data.user;

// 				next();				
// 			}
// 			else{
// 				res.status(401).send();
// 			}
// 		},function(err){
//             winston.error(" Error in checking accessToken validity" +  err);
// 	        return res.status(500).send();
// 		});
// 	}
// 	else{
// 		res.status(401).send();
// 	}


// }

let athenaRoutes = require('./routes/athena-server-routes.js');



// athenaRoutes(app,auth);
athenaRoutes(app);



var server = http.createServer(app);

server.listen(config.athena.port);