var async = require('async');


async.waterfall([
	
	function(cb){
		
		var id1='1.1';
		var id2='1.2';
		console.log("Step 1");
		cb(null,id1,id2);
		
	},
	function(obj1,obj2,cb)
	{
		obj1+=".3.1";
		obj2+=".3.2";
		console.log("Step 2");
		cb(null,obj1,obj2)
	}
	
	
],
	
	
	
	function(err,obj1,obj2){
		
		console.log("Step 3");
		console.log(obj1+" "+obj2);
		
	});
