var express  = require('express');
    router   = express.Router();
 			User     = require('../models/usersModel.js'),
				Vil 				 = require('../models/vilModel'),
 			Comment 	= require('../models/commmentsModel');

	// router.post('/comment', function(req, res) {
	// 	var comment = new Comment(req.body);
	// 		comment.save(function(err, comment) {
	// 			res.redirect('/villains/show');
	// 		});			
	// 	});



module.exports = router;
