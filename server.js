var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    port           = 3000 || process.env.PORT,
    app            = express(),
    passport       = require('passport'),
    bcrypt         = require('bcrypt-nodejs'),
    session        = require('express-session'),
    passportLocal  = require('passport-local'),
    mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/still-crag-36375'),
    // mongoose.connect('mongodb://localhost/words');
    mongoose.connect(mongoUri);

require('./config/passport.js')(passport);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(session({ secret: 'wordswords' }));
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});



var usersController = require('./controllers/usersController');
app.use('/users', usersController);

var vilController = require('./controllers/vilController');
app.use('/villains', vilController)
//this is the rout to the home page 
app.get('/', function(req, res){
  res.render('index.ejs');
});


mongoose.connection.once('open', function() {
    console.log("It's running boo");
    app.listen(port, function() {   
        console.log('Running on port ' + port);
    });
});





