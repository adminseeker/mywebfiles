var mongoose = require("mongoose");
var Sports=require("./sportsschema");

var data = [
	{
		sport:"cricket",
		college:"RVCE",
		players:[{playerName:"Satish Kumar",age:"21",skill:["batsmen","baller"]}]
	},
	{
		sport:"cricket",
		college:"Pesit",
		players:[{playerName:"Satish Kumar",age:"21",skill:["batsmen","baller"]}]
	}

]

function seedDB(){
	/*Sports.remove({}, function(err){
		if(err){
			console.log(err);
		}
			console.log("removed a SportsSchema!!!")
		
	});*/

	data.forEach(function(seed){
		Sports.create(seed, function(err, sports){
			if(err){
				console.log(err);
			}else{
				console.log("added new SportsSchema");

				
			}
		});
	});

}

module.exports=seedDB;