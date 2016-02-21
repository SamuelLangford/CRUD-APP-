var express  = require('express');
    router   = express.Router();
 		User     = require('../models/usersModel.js'),
		Vil 	 = require('../models/vilModel'),
 		passport = require('passport');    

// user index
router.get('/', function(req, res) {
	res.locals.login = req.isAuthenticated();
	User.find(function(err, user) {
		res.render('users/index.ejs', { user: user });
	});
});

// json for all users (for testing)
router.get('/json', function(req, res) {
	User.find(function(err, user) {
		res.send(users);
	});
});

// json for specific user, fetched by ajax to display markers on map
router.get('/:id/json', function(req, res) {
	User.findById(req.params.id, function(err, user) {
		res.send(user);
	});
});

// logout of session
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// show page -- can only be viewed if logged in
router.get('/:id', isLoggedIn, function(req, res) {
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
	failureRedirect: '/users' }), function(req, res) {
    // success redirect goes to show page
    res.redirect('/users/show.ejs' + req.user.id);
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

// middleware to check login status
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


// // router.get('/', function(req, res) {	
// // 	res.locals.login = req.isAuthenticated();
// // 	User.find(function(err, user) {
// // 		res.render('users/index.ejs', { user : user });
// // 	});
// // });






// // user create -- signup
// router.post('/', passport.authenticate('local-signup', { 
// 	failureRedirect: '/users' }), function(req, res) {
  
//     req.params.id == req.user.id ? res.locals.p = true : res.locals.p= false;
    
//     res.redirect('users/index.ejs' + req.body.id);

// });






// // user create -- signup
// // router.post('/', passport.authenticate('local-signup', { 
// // 	failureRedirect: '/users' }), function(req, res) {
// //     //success redirect goes to show page
// //     res.redirect('/users/' + req.user.id);
// // });








// // // json for all users (for testing)
// // router.get('/json', function(req, res) {
// // 	User.find(function(err, user) {
// // 		res.send(user);
// // 	});
// // });

// // // json for specific user, fetched by ajax to display markers on map
// // router.get('/:id/json', function(req, res) {
// // 	User.findById(req.params.id, function(err, user) {
// // 		res.send(user);
// // 	});
// // });

// // logout of session
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });






// // router.get('/:id', isLoggedIn, function(req, res) {
// // // IS THE USER LOGGED IN?
// // 	res.locals.usertrue = (req.user.id == req.params.id);
// // // FIND ALL USERS
// // 	User.find({}, function(err, users) {
// // // FIND THE USER BY THE ID
// // 		User.findById(req.params.id, function(err, users) {
// // 			res.render('users/inex.ejs', {
// // 						users: users
// // });
// // });
// // });
// // });


// // // SHOW
// // router.get('/:id', isLoggedIn, function(req, res) {
// //   // for user control flow within template (enables editing only on the user's own page)
// //     req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
// //   				// finding users by the id passed in the webpage
// //   	User.findById(req.params.id,function(err, user){
// //     	// rendering with that specific user's data
// //     	// console.log(data);
// //           res.render('/users/show.ejs' , { user : user });
// //   });
// // });

// // router.get('/:id', isLoggedIn, function(req, res) {
// //    req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
// //     User.find({}, function(err, users) {
// //         User.findById(req.params.id, function(err, user) {
// //             res.render('/users/show.ejs', {
// //                 user: user
// //             });
// //         });
// //     });                    
// // });    


	









// router.get('/:id', isLoggedIn, function(req, res){
// 	req.params.id == req.user.id ? res.locals.k= true : res.locals.k= false;
// 	User.findById(req.params.id, function(err, user){
// 		res.render('users/index.ejs', { user : user })
// 	})
// })



// //show page -- can only be viewed if logged in

// // router.get('/:id', isLoggedIn, function(req, res) {
// // 		// for user control flow within template (enables editing only on the user's own page)
// // 		// res.locals.usertrue = (req.user.id == req.params.id);
// //     req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
// // 		User.findById(req.params.id, function(err, user) {
// // 			res.render('users/index.ejs', { user : user});
// // 		});
// // });





// // // saves a new location to the Location model and the User's locations list
// // router.post('/:id/newVillain', function(req, res) {
// // 	User.findById(req.params.id, function(err, user) {
// // 		var vil = new Vil(req.body);
// // 		location.save(function(err, location) {
// // 			user.vils.push(vil);
// // 			user.save(function(err, user) {
// // 				res.redirect('/users/' + req.params.id);
// // 			});			
// // 		});
// // 	});
// // });

// // user create -- signup







// // delete 
// router.delete('/:id', function(req, res) {
// 	console.log('DELETE ROUTE ACCESSED');
// 	User.findById(req.params.id, function(err, user) {
// 		if (user.vils.length == 0) {
// 			user.remove(function(err) {
// 				res.redirect('/users');
// 			});
// 		} else {
// 			user.vils.forEach(function(location) {
// 				Vil.findOneAndRemove({ _id: location.id }, function(err) {
// 					if (err) console.log(err);
// 				});
// 			});
// 			user.remove(function(err) {
// 				res.redirect('/users');
// 			});
// 		} // end if
// 	}); // end User find
// });

// // middleware to check login showtatus
// // used in show route
// function isLoggedIn(req, res, next) {
// 	console.log('isLoggedIn middleware');
//   if (req.isAuthenticated()) {
//   	return next(); 
//   } else {
//   	res.redirect('/users');
//   }
// }



// module.exports = router;






























// Note: locals is express functionality that allows us to retrieve later in ejs to tailor the content

// INDEX

// router.get('/', function(req, res) {
// 	res.locals.login = req.isAuthenticated();
// 	User.find(function(err, data) {
// 		res.render('users/show.ejs', { users: data });
// 	});
// });

// // json for all users (for testing)
// router.get('/json', function(req, res) {
// 	User.find(function(err, data) {
// 		res.send(data);
// 	});
// });

// // json for specific user, fetched by ajax to display markers on map
// router.get('/:id/json', function(req, res) {
// 	User.findById(req.params.id, function(err, data) {
// 		res.send(data);
// 	});
// });

// // logout of session
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

// // show page -- can only be viewed if logged in
// router.get('/:id', isLoggedIn, function(req, res) {
// 		// for user control flow within template (enables editing only on the user's own page)
// 		console.log(req.params.id+' the request id')
// 		console.log(req.user.id+' the user id')
// 		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
// 		User.findById(req.params.id, function(err, data) {
// 			res.render('users/show.ejs', { users : data });
// 		});
// });

// // router.post('/:id/newmovie', function(req, res) {
// // 	User.findById(req.params.id, function(err, user) {
// // 		var movie = new Movie(req.body);
// // 		movie.save(function(err, location) {
// // 			user.movies.push(location);
// // 			user.save(function(err, user) {
// // 				res.redirect('/users/' + req.params.id);
// // 			});			
// // 		});
// // 	});
// // });

// // user create -- signup
// router.post('/', passport.authenticate('local-signup', { 
// 	failureRedirect: '/users' }), function(req, res) {
//     //success redirect goes to show page
//     res.redirect('/users/' + req.user.id);
// });


// // login
// router.post('/login', passport.authenticate('local-login', { 
// 	failureRedirect: '/users' }), function(req, res) {
//     // success redirect goes to show page
//     console.log(req.user.id);
//     res.redirect('/users/' + req.user.id);
// });





// // login
// // router.post('/l', passport.authenticate('local-login', { 
// // 	failureRedirect: '/' }), function(req, res) {
// //     // success redirect goes to show page
// //     res.redirect('/users/' + req.user.id);
// // });

// // router.post('/login', passport.authenticate('local-login', { 
// // 	failureRedirect: '/users' }), 
// // 	function(req, res) {
// //     // success redirect goes to show page
// //     res.redirect('/users/' + req.user.id);
// // });







// // delete 
// router.delete('/:id', function(req, res){
// 	User.findByIdAndRemove(req.params.id, function(error, data){
// 		res.redirect('/');
// 	})
// })
	
// // router.delete('/:id', function(req, res) {
// // 	console.log('DELETE ROUTE ACCESSED');
// // 	User.findById(req.params.id, function(err, user) {
// // 		if (user.movies.length == 0) {
// // 			user.remove(function(err) {
// // 				res.redirect('/users'); 
// // 			});
// // 		} else {
// // 			user.movies.forEach(function(movies) {
// // 				Movie.findOneAndRemove({ _id: movies.id }, function(err) {
// // 					if (err) console.log(err);
// // 				});
// // 			});
// // 			user.remove(function(err) {
// // 				res.redirect('imdex.ejs');
// // 			});
// // 		} // end if
// // 	}); // end User find
// // });

// // router.delete('/:id', function(req, res){
// // 	//goes into mongodb and finds it by the id and destroys it 
// // 	User.findByIdAndRemove(req.params.id, function(error, data){
// // 	//redirects to the the index
// // 	for (var i = 0; i < data..length; i++) {
// // 			console.log(data)
// // 			Movies.findByIdAndRemove(data.locations[i].id, function(error, data){
// // 			})	
// // 		}
// // 		res.redirect('/users')
// // 	})
// // });







// // middleware to check login status
// // used in show route
// function isLoggedIn(req, res, next) {
// 	console.log('isLoggedIn middleware');
//   if (req.isAuthenticated()) {
//   	return next(); 
//   } else {
//   	res.redirect('/users');
//   }
// }













