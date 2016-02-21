var mongoose = require('mongoose');


var vilSchema = mongoose.Schema({
	name:{type:String, required:true, unique:true},
	from:{type:String, required:true},
	image:String,
	accomplishments:[],
	about:String,
	// comments: [commentSchema]
});


var Vil = mongoose.model('Vil', vilSchema);



module.exports = Vil;
