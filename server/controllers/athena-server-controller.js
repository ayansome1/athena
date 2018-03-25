'use strict';
/* global require,module*/
// let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
// let fs = require('fs');
// let messaging = require('messaging');
// let aws = require("../lib/aws.js");


// let winston = require('winston');
let connInfo = config.sqlconn;
connInfo.multipleStatements = true;



let getAllPersons = (req, res) => {



  let patient = req.body.data;

  let connection = mysql.createConnection(connInfo);
  let query = "select * from person;";
  let params = [];
  connection.query(query, params, function (err) {

    if (err) {
      // winston.error("error in getting person details" + err);
      res.status(500).send(err);
    } else {
      res.status(200).send(["ayan","tanay"]);
    }

  });
  connection.end();

};


module.exports = {
  getAllPersons
};