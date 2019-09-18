var  mongoose=require("mongoose");

var SportsSchema = new mongoose.Schema({
	sport: String,
	college: String,
	players:[{
		playerName:String,
		age:String,
		skill:[String]
	}]
});


var  Sports= mongoose.model("Sports", SportsSchema);
module.exports=Sports;