//USER MODEL
var mongoose = require('mongoose');

var vilSchema = require('./vilModel.js'); 


var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
	username: String,
	email: String,
	password:String,
	vils: [vilSchema]
})


userSchema.methods.generateHash = function() {
	return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
} // this is the method to imply the bcrypt shit 

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User

