var jade = require('jade');

var User = require('../server/models/user');
var Block = require('../server/models/block');
var Group = require('../server/models/group');
var UserBlock = require('../server/models/userblock');
var Practice = require('../server/models/practice');
//DB.startup(conn);

var fs = require('fs');
var DB = require('../server/db');
var conn = 'mongodb://localhost/ACEditor';
var Practice = require('../server/models/practice');
DB.startup(conn);
/*fs.readFile('../material/material_fin2011/pract1/pract1.md', function(err, data) {
    if(err) throw err;
    var array = data.toString('utf8');
	p = new Practice({
	    pid:  'P1'
  	, jadeTemplate: data
  	, content:  [] 
	});
	options={};
	var fn = jade.compile(array, options);
	console.log(fn);
	
	locals={title: "P1",
			exList: []};
	
	fn(locals);
	console.log(fn(locals).toString());
	//console.log(array);
	


});*/

fs.readFile('../client/views/practice.jade', function(err, data) {
    if(err) throw err;
    
    var array = data.toString('utf8');
	DB.loadPractice({pid: 'P1'}, function(err,prac){
		if(!err)
			//prac.jadeTemplate=array
			prac.content=['5015188b3c39993b11000006','5015188b3c39993b11000004'];
			
			DB.updatePractice(prac,function(err,prac){
				if(err)
					console.log("Error saving");
				
			})
		
	})
	
	/*options={};
	var fn = jade.compile(array, options);
	console.log(fn);
	
	locals={title: "P1",
			exList: []};
	
	fn(locals);
	console.log(fn(locals).toString());
	//console.log(array);
	*/


});




/*meter plantilla en la base de datos**/


/*Cargar plantilla*/


/*compilar plantilla*/