
var dust = require('dustjs-linkedin');
var Block = require('../server/models/block');
var DB = require('../server/db');
var fs = require("fs");
var conn = 'mongodb://localhost/ACEditor';

DB.startup(conn);

fs.readFile('codigo.templ', function(err, data) {
	var text=data.toString('utf8');
	console.log(text);
	//var compiled=dust.compile("#include <stdio.h>\n#include <stdlib.h>\nint suma(int a, int b)\n{\n{#load1 blockid=\"CB1\"}\n}\nint resta(int a, int b)\n{\n{#load1 blockid=\"CB2\"}\n}\nint main()\n{\nint a=10,b=5;\nprintf(\"Suma: %d\n\",suma(a,b));\n	print(\"Resta: %d\n\",resta(a,b));\n		return 0;\n}\n"
	var compiled=dust.compile(text,"intro");
	dust.loadSource(compiled);

	loadblock = function(chunk, context, bodies, params) {
	    console.log(params.blockid)
	
	return chunk.map(function(chunk) {
           
			DB.loadBlock({_id: params.blockid}, function(err,b)
			{
							    	if(b)
							    		chunk.end(b.content);
							    	else
							    		chunk.end("");
			})
    					
	 })
 	}

	dust.render("intro",{load1: loadblock, algo: true, id:{func_suma: "503359125c0192780c000004"}}, 
  		function(err,out){
				console.log(out)
	
		});
})




/*#include <stdio.h>
#include <stdlib.h>


int suma(int a, int b)
{
	{#load blockid=\"CB1\"/}


}


int resta(int a, int b)
{
	{#load blockid=\"CB2\"/}

}


int main()
{
	int a=10,b=5;
	
	printf("Suma: %d\n",suma(a,b));
	print("Resta: %d\n",resta(a,b));
	
	return 0;


}*/
