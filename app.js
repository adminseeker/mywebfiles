var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Sports=require("./sportsschema");

var seedDB=require("./seeds");	

//seedDB();

mongoose.connect("mongodb://localhost/revagram_try_1", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.redirect("/sports");
});

app.get("/sports",function(req,res){
	Sports.find({}, function(err, allSports){

		if(err){
			console.log(err);

		}else{
			res.render("sports/index",{sports:allSports});
		}
	});
	
});

app.post("/sports", function(req, res){
	var college = req.body.college;
	var sport = req.body.sport;
	var players = req.body.players;
	var playerName = req.body.playerName;
	var age = req.body.age;
	var skill=req.body.skill.split(",");
	//var newSports = {"college":college, "sport":sport,"players":[{"playerName":playerName,"age":age,"skill":skill}]};
	Sports.findOneAndUpdate(
		{"college":college,"sport":sport},

		{
			$push:{
				"players":[{
					"playerName":playerName,"age":age,"skill":skill
				}]
			}
		},

		{upsert:true},
		 function(err, newlyCreated){
		

		if(err){
			console.log(err);
		}else{
			res.redirect("/sports");
		}
	});

});
app.get("/sports/new", function(req, res){
	res.render("sports/new");
});



app.get("/sports/:id", function(req, res){
	Sports.findById(req.params.id,function(err, foundSports){
		if(err){
			console.log(err);

		}else{
			//console.log(foundSports);
			res.render("sports/show",{sports: foundSports});
		}
	});

	
});

app.post("/sports/:id1/:id2", function(req, res, next){
	Sports.update({},{$pull: {players:{_id:mongoose.Types.ObjectId(req.params.id2)}}}, function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/sports");
		}
	
	});
});

app.post("/sports/:id", function(req, res){
	Sports.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/sports");
		}
	
	});
});




app.listen(3000, function(){
	console.log("[+]Server Started");
});

