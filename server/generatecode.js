
var dust = require('dustjs-linkedin');
var Block = require('./models/block');
var fs = require("fs");
var path =  require("path")

// No hace falta una nueva conexión a la db ya que tenemos acceso a la conexión que crea el server
//var DB = require('./db');
//DB.startup(conn)
//var conn = 'mongodb://localhost/ACEditor';

_this = this; //save the poitner to the base object

loadblock = function(chunk, context, bodies, params) {
    
    return chunk.map(function(chunk) {
           //no es correcto debe tener en cuenta el id del bloque real no el tag
            DB.loadBlock({_id: params.blockid}, function(err,b)
            {
                if(!err)
                {
                                    if(b)
                                        chunk.end(b.content);
                                    else
                                        chunk.end("");
                }
            })
                        
     })
    }

var dictLength = function (dict)
{
    var length=0;
    console.log(dict);
    for(var i in dict)
    {
        length++;
    } 
    
    return length
    
}

var moveFilesToHDD = function(fileList,dir,cb)
{
     var fileslength = fileList.length;
     if(fileList.length == 0)
     {
         cb(null);
         return;
     }   
     for(var f=0;f < fileList.length;f++) 
     {
          
          DB.loadPrivateFile({_id:fileList[f]},function(err,file)
          {
                           
                            if(err)
                                cb(err);
                            else if(file == null)
                            {
                                cb("No file in database")
                            }
                            else
                            {
                                    console.log(file)
                                    var data=new Buffer(file.data, 'base64');
                                    console.log(file.data+"     - -  "+data.toString('utf8'));
                                    fs.writeFileSync(path.normalize(dir+"/"+file.filename),data,'utf8');
                            }
                            fileslength--;
                            if(fileslength == 0)
                            {
                                 console.log("All Files: saved to disc");
                                 cb(null);
                            }
                        });
    }
    
    
    
}

exports.generateCode = function(userid,practiceid,dustTemplates,files,sandbox,cb)
{
        log.debug("start generating code for user "+userid+"...")
        
        var templates = {};
        
         var fileList = [];
         
        DB.loadPractice({_id: practiceid},function(err,practice)
        {
           DB.loadUserConf({uid: userid, pid: practice._id}, function(err,userconf)
           {
                if(!err)
                {
                    for(var i in practice.files)
                    {
                        for(var j in files)
                        {

                                if(practice.files[i].filename.toString() == files[j])
                                {
                                    
                                    fileList.push(practice.files[i].id); 
                                    
                                }
                        }
                    }

                    for(var i in practice.dustTemplates)
                    {
                        for(var j in dustTemplates)
                        {
                        console.log(practice.dustTemplates[i].name.toString())
                        console.log(dustTemplates[j][0].toString())
                                if(practice.dustTemplates[i].name.toString() == dustTemplates[j][0].toString())
                                {
                                    
                                    templates[practice.dustTemplates[i].name]=practice.dustTemplates[i]; 
                                    
                                }
                        }
                    }
                    
                    console.log("TEMPLATES: "+ dictLength(templates))
                    if(dictLength(templates) > 0)
                    {
                                                    
                           //prepare user blocks
                           //array of ids
                           var blockids=[];
                           for( var id in practice.ids)
                           {
                              blockids.push(practice.ids[id]);
                               
                           } 
                           
                           DB.loadUserBlocks({
                                                uid: userid,
                                                defblock : {
                                                    $in : blockids
                                                }
                                            }, function(err, userb) {
                                                if(!err) {
                                                       var bids = {};
                                                       for( var id in practice.ids)
                                                       {            
                                                           for(var ub in userb)
                                                           {
                                                                if(userb[ub].defblock.toString() == practice.ids[id])
                                                                {
                                                                    bids[id]=userb[ub].ublocks;
                                                                }
                                                           }
                                                       }
                                                       var myContext = {};
                                                       myContext["load"]=loadblock;
                                                       myContext["id"]=bids;
                                                       
                                                       for(var s in userconf.config.status)
                                                       {
                                                            myContext[s]=userconf.config.status[s];
                                                       }
                                                       //userconf.config["load"]=loadblock;
                                                       //userconf.config["id"]=bids;
                                                       //console.log(userconf.config);
                                                       //console.log(myContext);
                                                       dustsLength = dictLength(templates);
                                                       for (var t in templates)
                                                       {
                                                               dust.loadSource(templates[t].compiled);
                                                               dust.render(templates[t].name+"-"+practiceid,myContext, 
                                                               function(err,out){
                                                                   dustsLength--; 
                                                                   if(err)
                                                                   {
                                                                        log.trace(err);
                                                                        cb(err);
                                                                       
                                                                   }
                                                                   else
                                                                   {
                                                                       //write output to file
                                                                       console.log(out)
                                                                       console.log(sandbox)
                                                                       //fs.writeFileSync(path.normalize(sandbox+"/"+userid+"/"+dustTemplates[j][1]),out,'utf8');
                                                                       fs.writeFile(path.normalize(sandbox+"/"+userid+"/"+dustTemplates[j][1]), out, 'utf8', function(err)
                                                                       {
                                                                           if(err)
                                                                           {
                                                                               cb(err);
                                                                               
                                                                           }
                                                                           else
                                                                           {
                                                                               moveFilesToHDD(fileList,path.normalize(sandbox+"/"+userid),function(err)
                                                                               {
                                                                                   if(err)
                                                                                        cb(err);
                                                                                   else
                                                                                      if(dustsLength == 0)
                                                                                          cb(null);
                                                                               })
                                                                               
                                                                           }
                                                                           
                                                                       })
                                                                   }
                                                                   
                                                                 })
                                                         }
                                                    
                                                    }
                                                    else
                                                    {
                                                        cb(err);
                                                    }
                                                    
                                                });
                        
    
                         
    
                    }
                    else
                    {
                        cb("No template available");
                    }
    
                }
                else
                {
                    cb(err);
                }
            
             });
        })
        
}
    

