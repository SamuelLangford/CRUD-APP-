var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    port           = 3000 || process.env.PORT,
    app            = express(),
    passport       = require('passport'),
    bcrypt         = require('bcrypt-nodejs');
    



mongoose.connect('mongodb://localhost/');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(methodOverride('_method'));



var usersController = require('./controllers/usersController');

app.use('/users', usersController);

//this is the rout to the home page 
app.get('/', function(req, res){
  res.render('index.ejs');
});


app.listen(port, function() {
    console.log('Running on port ' + port);
});