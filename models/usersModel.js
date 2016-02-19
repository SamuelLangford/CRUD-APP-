//USER MODEL
var mongoose = require('mongoose');

var userScema = mongoose.Schema({
	username: String,
	email: String,
	password:String,
	likes: []
})



module.exports = mongoose.model('User', userScema);