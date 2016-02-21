var mongoose = require('mongoose');


var vilSchema = mongoose.Schema({
	name:{type:String, required:true, unique:true},
	from:{type:String, required:true},
	accomplishments:[],
	about:String,
	comments: [String]
});


var Vil = mongoose.model('Vil', vilSchema);



module.exports = Vil;
