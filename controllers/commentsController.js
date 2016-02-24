var express  = require('express');
    router   = express.Router();
 			User     = require('../models/usersModel.js'),
				Vil 				 = require('../models/vilModel'),
 			Comment 	= require('../models/commmentsModel');

	router.post('/comment', function(req, res) {
		var comment = new Comment(req.body);
			comment.save(function(err, comment) {
				// console.log(comment);
				res.redirect('/villains/show');
			});			
		});


function isLoggedIn(req, res, next) {
  console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/users');
  }
}


module.exports = router;
