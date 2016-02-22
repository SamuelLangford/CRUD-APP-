var express  = require('express');
    router   = express.Router();
 			User     = require('../models/usersModel.js'),
				Vil 	 = require('../models/vilModel'),
 			passport = require('passport');    







// logout of session
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
// isLoggedIn,
// show page -- can only be viewed if logged in
router.get('/:id',isLoggedIn,  function(req, res) {
		// for user control flow within template (enables editing only on the user's own page)
		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
		User.findById(req.params.id, function(err, user) {
			res.render('users/show.ejs', { user: user });
		});
});




// user create -- signup
router.post('/', passport.authenticate('local-signup', { 
	failureRedirect: '/' }), function(req, res) {
    //success redirect goes to show page
    res.redirect('/users/' + req.user.id);
});






// login
router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/' }), function(req, res) {
    // success redirect goes to show page
    res.redirect('/users/' + req.user.id);
});


router.post('/:id', function(req, res) {
		var villain = new Vil(req.body);
			villain.save(function(err, villain) {
				res.redirect('/villains/');
			});			
		});





// delete 
router.delete('/:id', function(req, res) {
	console.log('DELETE ROUTE ACCESSED');
	User.findById(req.params.id, function(err, user) {
				user.remove(function(err) {
				res.redirect('/');
			});
		}) // end if
	}); // end User fin

// middleware to check login showtatus
// used in show route
function isLoggedIn(req, res, next) {
	console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
  	return next(); 
  } else {
  	res.redirect('/users');
  }
}

module.exports = router;















