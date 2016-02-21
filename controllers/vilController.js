var express = require('express'),
    router  = express.Router();

var User      = require('../models/usersModel'),
    Vil  = require('../models/vilModel');
// villains
// villains index
router.get('/', isLoggedIn, function(req, res) {
 Vil.find(function(err, vils) {
        res.render('villains/index.ejs' , { vils: vils} );
    });
});





// router.get('/', isLoggedIn, function(req, res) {
// Location.find(function(err, locations) {
// res.render('locations/index.ejs', { locations: locations });
// });
// });


// json for words, gets by ajax to display words
// router.get('/json', function(req, res) {
// 	Location.find(function(err, location) {
// 		res.send(location);
// 	});
// });

// middleware to check login status
// used in index route
function isLoggedIn(req, res, next) {
  console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/users');
  }
}

module.exports = router;
// user index
// router.get('/', function(req, res) {
//  res.locals.login = req.isAuthenticated();
//  User.find(function(err, user) {
//    res.render('users/index.ejs', { user: user });
//  });
// });