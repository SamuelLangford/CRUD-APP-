var mongoose = require('mongoose');

var commentSchema = require('./commentsModel.js').schema;



var vilSchema = mongoose.Schema({
	name:{type:String, required:true, unique:true},
	from:{type:String, required:true},
	image:String,
	quote:String,
	about:String,
	comments: [ commentSchema ]
});


var Vil = mongoose.model('Vil', vilSchema);



module.exports = Vil;
