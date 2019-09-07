var mongoose = require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data = [
	{
		name:"bonfire",
		image:"https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg",
		description:"campfire available"
	},
	{
		name:"hillcamp",
		image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg",
		description:"Nice cool air"
	},
	{
		name:"rivercamp",
		image:"https://glenworth.com.au/wp-content/uploads/2018/02/ARC8133.jpg",
		description:"Fresh river breeze"
	}
]

function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
			console.log("removed campgrounds!!!")
		
	});

	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			}else{
				console.log("added new campground");

				Comment.create({
					text:"This place could use some internet",
					author:"Aravind"
				}, function(err, comment){
					if(err){
						console.log(err);
					}else{
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment");
					}
				} 

				);
			}
		});
	});

}

module.exports=seedDB;