'use strict';
/* global require*/
/* global process, console, authenticated */
/* jshint node: true */
var express = require('express');
var http = require('http');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
// var _ = require('underscore');
var config = require('./config/config.js');
var bodyParser = require('body-parser');
// let q = require('q');
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





let athenaRoutes = require('./routes/athena-server-routes.js');



// athenaRoutes(app,auth);
athenaRoutes(app);



var server = http.createServer(app);

server.listen(config.athena.port);