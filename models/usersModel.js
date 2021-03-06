//USER MODEL
var mongoose = require('mongoose');

var vilSchema = require('./vilModel.js'); 


var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
	username: String,
	email: String,
	password:String
})

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User', userSchema);

module.exports = User

