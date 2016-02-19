var express = require('express'),
	router  = express.Router();

var User = require('../models/usersModel');

router.get('/', function(req, res) {
	User.find(function(err, users){

	})
});






module.exports = router;
