var express = require('express'),
    router  = express.Router();

var User      = require('../models/usersModel'),
    Vil  = require('../models/vilsModel');

// words index
// router.get('/', isLoggedIn, function(req, res) {
//     Movie.find(function(err, movies) {
//         res.render('locations/index.ejs', { movies: movies });
//     });
// });

// // json for words, gets by ajax to display words
// router.get('/json', function(req, res) {
// 	Location.find(function(err, location) {
// 		res.send(location);
// 	});
// });

// // middleware to check login status
// // used in index route
// function isLoggedIn(req, res, next) {
//   console.log('isLoggedIn middleware');
//   if (req.isAuthenticated()) {
//     return next(); 
//   } else {
//     res.redirect('/users');
//   }
// }

module.exports = router;
