var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
	user:String,
	words:String
});


var Comment = mongoose.model('Comment', commentSchema;



module.exports = Comment;
