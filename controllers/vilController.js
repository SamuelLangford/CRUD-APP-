var express   = require('express'),
    router    = express.Router(),
    User      = require('../models/usersModel'),
    Vil       = require('../models/vilModel');

// villains index

router.get('/', isLoggedIn, function(req, res) {
 Vil.find(function(err, vils) {
        res.render('villains/index.ejs' , { vils: vils} );
    });
});

router.get('/:id', function(req, res){
   Vil.findById(req.params.id, function(err, vils) {
    res.render('villains/show.ejs', vils)
   })
})

// router.get('/:id', function(req, res){
//   Article.findById(req.params.id, function(err, data){
//     res.render('articles/show.ejs',data);
//   })
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