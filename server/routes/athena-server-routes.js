/*global require, module*/
'use strict';

let athenaCtrl = require('../controllers/athena-server-controller');


module.exports = (app) => {

	app.get('/get-all-persons',athenaCtrl.getAllPersons);

};