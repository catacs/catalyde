/**
 * @author Catalin Stanciu
 */
var  log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' }
    ]
});

log = log4js.getLogger('catalyde');
var program = require('commander');
var fs = require('fs');
var path = require('path');
var DB = require('./db');
var conn = '';//'mongodb://localhost/ACEditor'; 
var async= require('async');
var lineReader = require('line-reader');
var Block = require('./models/block');
var Practice = require('./models/practice');
var dust = require('dustjs-linkedin');
//to disable whitespace compression and newlines elimination.
dust.optimizers.format = function(ctx, node) { return node };



program
    //.version(packageJSON.version)
    .option('-H, --host <ip_address>', 'only accept traffic directed to a specific ip')
    .option('-p, --port <number>', 'use a custom http port')
    .option('-D, --dbtype <dbtype>', 'db to upload development/production')
    .option('-d, --directory <directory>', 'practice directory to parse')

program
    .command('listen [directory]')
    .action(function(dir){
        // Work around name collision caused by "password" function provided by commander

		var marks={
			
			start: "<!--",
			end: "-->",
			bb: "BEGINBLOCK",
			eb: "ENDBLOCK",
			type: "type",
			edit: "editable"
			
		}
		
    	var files = ['conf.json','pract.json',"actions.js"];
    	var directories = ['dust','contents'];//['jade','dust','contents'] 
        var directory = program.directory instanceof Function ? undefined : program.directory
        var host = program.host instanceof Function ? undefined : program.host
        var port = program.port instanceof Function ? undefined : program.port
        var dbtype = program.dbtype instanceof Function ? "development" : program.dbtype
        
        conn='mongodb://'+host+'/Catalyde-dev';
        
        if(dbtype == "production")
            conn = conn='mongodb://'+host+'/Catalyde';
        console.log("DB connection: "+conn)
        var blocks = [];
        var _ids = {};
        var actualblock = null;
       
        //console.log(conn);
        DB.startup(conn);
        
        
		parsetag= function(tag)
		{
			var o =  new Object();
			o.variable="";
			o.value="";
			
			for(var i=0;i<tag.length;i++)
			{
				if(tag.charAt(i) == "=")
					break;
				o.variable+=tag.charAt(i);
			}
			if(tag.charAt(i+1) != "\"" || tag.charAt(tag.length-1) != "\"")
				return null;
			else
				o.value = tag.substring(i+2, tag.length-1);
			
			//console.log(o.variable +" " +o.value)
			
			return o;
		}
		buildblock = function(substr)
		{
			var tags = null;
			var t = null;
			var type = null; 
			//var block = null;
			/*for(var p = 0; p < substr.length; p++ )
			{
				t=parsetag(substr[p]);
				
				if(t != null)
					tags[t.variable]=t.value;
				else
				{
					console.log("for"+ t.variable+" "+t.value+"defvuelov nulll")
					return null;
				}
			}*/
			//console.log(substr.join(" "))
			tags = JSON.parse(substr.join(" "));
			editable = tags["editable"] == "true";
			checkbutton = tags["checkbutton"] == "true";
			type=tags["type"];
			delete tags["type"];
			//creating the object
			switch(type)
			{
				case "code":
					 block = new Block.Code({
					 	  	     editable: editable
      						   , buttons:  tags.buttons  || []
      						   , content: ""
      						   , b_tag: tags["b_tag"]
      						   , checkbutton: checkbutton
					  })
				break;
				case 'markdown':
					block = new Block.MarkDown({
					           
								 editable: editable
      						   , buttons:  tags.buttons  || []
      						   , content: ""
      						   , b_tag: tags["b_tag"]
      						   , checkbutton: checkbutton
					  		
					  })
				break;
				case "text":
					block = new Block.Text({
					  		     editable: editable
      						   , buttons:  tags.buttons  || []
      						   , content: ""
      						   , b_tag: tags["b_tag"]
      						   , checkbutton: checkbutton
					  })
				break;
				
				default:
						console.log("switch"+ tags["type"]+" defvuelov nulll")
						return null;
				
			}
			//console.log("TAGS:\n"+tags["b_tag"])
			if (tags["b_tag"])
			{
			    if(tags["b_tag"] in _ids)
			    {
			        
			        console.log("Tag " + tags["b_tag"]+" already used." )
			        return null;
			    }
			    else
			    {
			        console.log("tag added")
			        _ids[tags["b_tag"]]=block._id;
			        console.log(tags["b_tag"]+ "->"+_ids[tags["b_tag"]]);
			    }
			     
			}			
			return block;
			
			
		}
		
		
		
        
        parseline = function(line)
        {
        	var b= new Object();
        	b.type="";
        	b.content="";
        	b.editable=false;
        	var substr=line.replace(/ +(?= )/g,'');
        	substr=substr.split(" ");
        	


        	if(substr[0] != marks.start  || substr[substr.length-1] != marks.end) //no es comment
        	{
        		if(actualblock != null) //lo he creado por tnato he pasado por begin
        		{
        			if(actualblock.content == "")
        				actualblock.content=line;
        			else
        				actualblock.content = actualblock.content+ "\n"+ line;
        		}	
        		else
        		{
        			substr = line.replace(/\s/g,'');
        			
        			if(substr == "")
        			{
        				return true;
        			}
        			console.log("actualblock es nullllll");
        			return false;
        		}
        			
        	}
        	else
        	{//es un comment
        		
        		switch(substr[1])
        		{
        			case marks.bb:        			 
        					actualblock = buildblock(substr.slice(2,substr.length-1));
        						
        					
        					break;
        			case marks.eb: 
        					//añadir el bloque a la lista
        					//console.log("saving" + actualblock.toString()); 
        					blocks.push(actualblock);
        					actualblock = null;
        					break;
        			default:
        					console.log("ni begin ni end en comment es nullllll");
      						return false;
        			
        		}
        		
        	}
        	
        	return true;
        	
        }
        
        console.log(directory+" "+" "+host+" "+port + " "+ conn)
       	
		try {
		    // Query the entry
		    for(var i in files)
		    {
		    		stats = fs.lstatSync(path.join(directory,files[i]));
		
				    // Is it a directory?
				    if (!stats.isFile()) {
				        throw "err is not a file"
				    }
		    }
		    
		    for(var i in directories)
		    {
		    		stats = fs.lstatSync(path.join(directory,directories[i]));
		
				    // Is it a directory?
				    if (!stats.isDirectory()) {
				        throw "err is not a directory"
				    }
		    }
		    
		    ///file and directories are correct
		    
		    console.log("reading config...");
		    
		  var prac = JSON.parse(fs.readFileSync(path.join(directory,"pract.json"),'utf8'));
		  //var prac = require(path.join(directory,'pract'));
		    var pracroute = path.join(directory,prac.practice);
			var data = fs.readFileSync(pracroute,'utf8');
			//var jaderoute = path.join(directory,prac.jadeTemplate);
			//var jade = fs.readFileSync(jaderoute,'utf8');
			var actions = fs.readFileSync(path.join(directory,"actions.js"),'utf8');
			var conf = JSON.parse(fs.readFileSync(path.join(directory,"conf.json"),'utf8'));
			var dusts = []; 
            lineReader.eachLine(pracroute, function(line) {
			    
				var r = parseline(line)
			  
				if( r == false )
				{
					console.log(line)
					throw "error sintax incorrenct";
				}
			  
			  
			}).then(function () {
				
				console.log("salvando a la bd...");
				
				blockids=[];
				
				for(var b=0;b < blocks.length;b++)
				{
					//console.log(blocks[b])
					blockids.push(blocks[b]._id);
				}
				
				var myPractice = new Practice({
					  title: prac.title
					//, jadeTemplate:	jade
 					, dustTemplates: []
 					, actions: actions
					, content: blockids
					, ids: _ids
					, conf:  conf
				})
				
				
				            
            
                for(var d in prac.dustTemplates)
                {
                   
                    var template=fs.readFileSync(path.join(directory,"dust",prac.dustTemplates[d]),'utf8');
                    var compiled = dust.compile(template,prac.dustTemplates[d]+"-"+myPractice._id);
                    dusts.push({ "name": [prac.dustTemplates[d]], "compiled": compiled});
                }
                
                myPractice.dustTemplates = dusts;
            
				DB.savePractice(myPractice,function(err,p)
				{
					
					if(!err)
    				{	
    				    DB.loadGroup({description: 'admin'},function(err,group)
    				    {
    				        if(err || group == null)
    				            throw err;
    				        else
    				        {
    				            console.log(group.toString());
    				            group.practices.push(myPractice._id.toString());
                                DB.updateGroup(group,function(err,gr)
                                {
                                        if(!err)
                                        {    
                        				    var savedblocks=blocks.length;
                        				    for(var b=0;b < blocks.length;b++)
                                            {
                                                //console.log(blocks[b])
                                                blockids.push(blocks[b]._id);
                                        
                                                DB.saveBlock(blocks[b],function(err,block){
                                                    if(err)
                                                        throw err;
                                                    savedblocks--;
                                                    
                                                    if(savedblocks==0)//i saved practice and blocks
                                                    {
                                                        console.log("Practice: "+myPractice._id+" saved");
                                                        DB.closeDB();
                                                        process.exit(0)
                                                    }
                                                        
                                                        
                                                    
                                                });
                                                
                                                
                                            }
                                        }
                                        else
                                                throw err;
                                })
                            }
                        })
                    }
                    else
                           throw err;
                        
                    
						
					
				})
				
				
			  
			});
			
			
			

		    
		    

		}
		catch (e) {
		    console.log(e);
		}
		     
               
      })


if (process.argv.length > 2) {
    if (process.argv[2].charAt(0) == '-') {
        process.argv.splice(2, 0, 'listen')
    }
    program.parse(process.argv);
} else {
   console.log("must provide arguments")
}
