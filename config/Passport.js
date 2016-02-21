var User = require('../models/usersModel');

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

	// console.log('PASSPORT CONFIG LOADED');


	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });



// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {

		// console.log('Req.body within local signup: ', req.body);

		User.findOne({ 'email': email }, function(err, user) {
			if (err) { return done(err) }
			if (user) { 
				return done(null, false); 
			} else {
				var newUser = new User();
				newUser.email = email;
				newUser.password = newUser.generateHash(password);
				newUser.username = req.body.username;
				newUser.save(function(err) {
					if (err) { 
						console.log(err)
						throw err
					} else {
						return done(null, newUser);
					}
				}); // end user save
			} // end user check exists
		}) // end find user

	} // end localstategy params

	));

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));
};  // <------------ end mondule.exports

