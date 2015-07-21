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
var Block = require('./models/block');
var Practice = require('./models/practice');
var PublicFile = require('./models/publicfile');
var PrivateFile = require('./models/privatefile');
var dust = require('dustjs-linkedin');
//to disable whitespace compression and newlines elimination.
dust.optimizers.format = function(ctx, node) { return node };

program
  .option('-H, --host <ip_address>', 'only accept traffic directed to a specific ip',"localhost")
  .option('-p, --port <number>', 'use a custom http port',Number,8123)
  .option('-d, --directory <directory>', 'practice directory to parse')
  .option('-D, --dbtype <dbtype>', 'db to upload development/production',"development")
  .parse(process.argv);

var directory   = program.directory
var host        = program.host
var port        = program.port
var dbtype      = program.dbtype
var directories = ['dust','contents'] 
var files       = ['conf.json','pract.json',"actions.js"];
var conn        = 'mongodb://'+host+((dbtype == "production") ? '/Catalyde' : '/Catalyde-dev');
console.log("DB connection: "+conn)
var blocks = [];
var _ids = {};
var actualblock = null;
DB.startup(conn);

parsetag = function(tag) {
  var o =  new Object();
  o.variable="";
  o.value="";
  
  for(var i=0;i<tag.length;i++) {
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

there_is_content = function(vect) {
  for(var i in vect) {
    if (!vect[i].match(/^\s*$/))
      return true;
  }
  return false;
}

// returns a block or some indicator there is no block
process_blocklines = function(blocklines, header) {
  // process the header
  if (header != "" || there_is_content(blocklines)) {
    if (header == "")
      header = '{"type":"markdown", "editable":"false"}';
    var content     = blocklines.join("\n");
    //console.log("contenido: "+content)
    var tags        = JSON.parse(header);
    var editable    = tags["editable"] == "true";
    var checkbutton = tags["checkbutton"] == "true";
    var type        = tags["type"];
    var block;
    switch(type) { //creating the object
    case "code":
      block = new Block.Code({
	editable: editable
	, buttons: tags.buttons || []
	, content: content
	, b_tag: tags["b_tag"]
	, checkbutton: checkbutton
      })
      break;
    case 'markdown':
      block = new Block.MarkDown({
	editable: editable
	, buttons:  tags.buttons  || []
	, content: content
	, b_tag: tags["b_tag"]
	, checkbutton: checkbutton
      })
      break;
    case "text":
      block = new Block.Text({
	editable: editable
	, buttons:  tags.buttons  || []
	, content: content
	, b_tag: tags["b_tag"]
	, checkbutton: checkbutton
      })
      break;
    case "comment":
      // nothing to do
      break;
    default: // ignore or error?
      console.log("warning type "+ tags["type"]+" not supported");
      return null;
    }
    // process b_tag
    if (tags["b_tag"]) {
      if(tags["b_tag"] in _ids) {
	console.log("Tag " + tags["b_tag"]+" already used." )
	return null;
      } else {
	_ids[tags["b_tag"]]=block._id;
	console.log("tag added: "+tags["b_tag"]+ "->"+_ids[tags["b_tag"]]);
      }
    }
    if (block != null)
      blocks.push(block);
  }
  blocklines.splice(0,blocklines.length); // remove array contents
}

parse_datalines = function(datalines) {
  var beginblockpattern = /^<!--\s*BEGINBLOCK/;
  var extractheaderpatt = /^<!--\s*BEGINBLOCK\s*(.*)\s*-->\s*$/;
  var endblock          = '<!-- ENDBLOCK -->';
  var blocklines        = [];
  var header            = ""
  for(var i in datalines) { // procesamos las lineas de una en una
    var line = datalines[i];
    if (line.match(beginblockpattern)) {
      process_blocklines(blocklines,header);
      header = line.match(extractheaderpatt)[1];
    } else if (line == endblock) {
      process_blocklines(blocklines,header);
      header = "";
    } else { // in the middle of a block
      blocklines.push(line);
    }
  }
  // at the end in case the last block is not closed:
  process_blocklines(blocklines,header);
}


console.log(directory+" "+" "+host+" "+port + " "+ conn)
try { // Query the entry
  for(var i in files) {
    stats = fs.lstatSync(path.join(directory,files[i]));
    if (!stats.isFile()) { // Is it a file?
      throw "err is not a file"
    }
  }
  for(var i in directories) {
    stats = fs.lstatSync(path.join(directory,directories[i]));
    if (!stats.isDirectory()) { // Is it a directory?
      throw "err is not a directory"
    }
  }
  console.log("reading config...");  ///file and directories are correct
  var prac      = JSON.parse(fs.readFileSync(path.join(directory,"pract.json"),'utf8'));
  var pracroute = path.join(directory,prac.practice);
  
  var publicfilesroute = path.join(directory,"contents/public");
  var privatefilesroute = path.join(directory,"contents/private");
  var publicfilenames = fs.readdirSync(publicfilesroute);
  var privatefilenames = fs.readdirSync(privatefilesroute);
  
  
  var datalines = fs.readFileSync(pracroute,'utf8').split('\n');
  // se come lineas en blanco  var datalines = fs.readFileSync(pracroute,'utf8').match(/[^\r\n]+/g);
  var actions   = fs.readFileSync(path.join(directory,"actions.js"),'utf8');
  var conf      = JSON.parse(fs.readFileSync(path.join(directory,"conf.json"),'utf8'));

  console.log("salvando a la bd...");
  
  parse_datalines(datalines);
  blockids = [];
  files    = [];
  publicfiles = [];
  contents = []
  for(var b=0;b < blocks.length;b++) {
    blockids.push(blocks[b]._id);
  }
  
  var statsPrivate = fs.lstatSync(privatefilesroute);
  if(statsPrivate.isDirectory())
  {
      for(var f=0;f < privatefilenames.length;f++) 
      {
            console.log(path.join(privatefilesroute,privatefilenames[f]));
            try {
                    // Query the entry
                    var filestats = fs.lstatSync(path.join(privatefilesroute,privatefilenames[f]));
                    console.log(filestats);
                    var isHidden = /^\./.test(privatefilenames[f]);
                    // Is it a file?
                    if (filestats.isFile() && !isHidden) {
                            data = fs.readFileSync(path.join(privatefilesroute,privatefilenames[f]));
                            data_base64 = new Buffer(data).toString('base64');
                            
                            files.push(new PrivateFile({filename: privatefilenames[f],data: data_base64 }));
                            contents.push({'filename': privatefilenames[f], 'id': files[f]._id })
                       
                    }
            }
            catch (e) {
	      //console.log("Mmmm");
              throw e;
            }
    
      }
  }
  var statsPublic = fs.lstatSync(publicfilesroute);
  if(statsPublic.isDirectory())
  {
        for(var f=0;f < publicfilenames.length;f++) 
        {
            console.log(path.join(privatefilesroute,publicfilenames[f]));
            try {
                    // Query the entry
                    stats = fs.lstatSync(path.join(publicfilesroute,publicfilenames[f]));
                    var isHidden = /^\./.test(publicfilenames[f]);
                    // Is it a file?
                    if (stats.isFile() && !isHidden) {
                            data = fs.readFileSync(path.join(publicfilesroute,publicfilenames[f]));
                            data_base64 = new Buffer(data).toString('base64');
                            
                            publicfiles.push(new PublicFile({filename: publicfilenames[f],data: data_base64 }));
                       
                    }
            }
            catch (e) {
              throw e;
            }
        }
  }

  var myPractice = new Practice({
    title: prac.title
    , longtitle: prac.longtitle
    , dustTemplates: []
    , actions: actions
    , files: contents
    , content: blockids
    , ids: _ids
    , conf:  conf
  })
				
  var dusts = [];
  for(var d in prac.dustTemplates) {
    var template=fs.readFileSync(path.join(directory,"dust",prac.dustTemplates[d]),'utf8');
    var compiled = dust.compile(template,prac.dustTemplates[d]+"-"+myPractice._id);
    dusts.push({ "name": [prac.dustTemplates[d]], "compiled": compiled});
  }
  myPractice.dustTemplates = dusts;

  DB.savePractice(myPractice,function(err,p) {
    if(!err) {	
      DB.loadGroup({description: 'admin'},function(err,group) {
    	if(err || group == null) {
	  console.log("DB.loadGroup({description: 'admin'}");
    	  throw err;
	} else {
    	  console.log("Group: "+group.toString());
    	  group.practices.push(myPractice._id.toString());
          DB.updateGroup(group,function(err,gr) {
            if(!err) {    
              var savedblocks=blocks.length;
              async.waterfall([
                                saveBlocks,
                                savePrivateFiles,
                                savePublicFiles,
                             ], function (err, result) { 
                        DB.closeDB();
                        process.exit(0)  
              });
              function saveBlocks(cb)
              {
                  for(var b=0;b < blocks.length;b++) {
                      
                    blockids.push(blocks[b]._id);
                    console.log("Pushing back block: " + blocks[b]._id + "  "+ b)
                    DB.saveBlock(blocks[b],function(err,block) {
                      if(err)
                        throw err;
                        //cb(err);
                      savedblocks--;
                      if(savedblocks==0) {//i saved practice and blocks
                        console.log("All Blocks: saved");
                         //DB.closeDB();
                        //process.exit(0)
                         cb(null);
                      }
                    });
                  } // closes for
              }
              
              function savePrivateFiles(cb)
              {
                   
                   var savedFiles = privatefilenames.length;
                   for(var f=0;f < privatefilenames.length;f++) 
                   {
                        DB.savePrivateFile(files[f],function(err,file)
                        {
                           
                            if(err)
                                cb(err);
                            savedFiles--;
                            if(savedFiles == 0)
                            {
                                 console.log("All Files: saved");
                                 console.log("Practice: "+myPractice._id+" saved");
                                 cb(null);
                            }
                        });
                   }
              }
              
              function savePublicFiles(cb)
              {
                   var savedFiles = publicfiles.length;
                   for(var f=0;f < publicfiles.length;f++) 
                   {
                        DB.savePublicFile(publicfiles[f],function(err,file)
                        {
                           
                            if(err)
                                cb(err);
                            savedFiles--;
                            if(savedFiles == 0)
                            {
                                 console.log("All Files: saved");
                                 console.log("Practice: "+myPractice._id+" saved");
                                 cb(null);
                            }
                        });
                   }
              }
            } else
              throw err;
          }) // closes updategroup
        } // closes else
      }) // closes loadGroup
    } // closes if !err
    else
      throw err;
  }) // DB.savePractice

} catch (e) {
  console.log(e);
}

