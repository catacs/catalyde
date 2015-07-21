// practice.js

var async = require('async');
var db = require('../db');
var jade = require('jade');
var UserBlock = require('../models/userblock');
var Block = require('../models/block');
var UserConf = require('../models/userconfig');
var marked = require( "marked" );
var hljs = require('highlight.js');
var ObjectId = require('mongoose').Types.ObjectId; 
var actions = {}; // es un diccionario que asocia a un practice id otro 
                  //diccionario con las acciones de dicha practica

marked.setOptions({
    gfm: true,
    sanitize: true,
    highlight: function(code, lang) {
	// if (lang === 'js') {
	return hljs.highlight("cpp", code).value;
	// Automatic language detection
	// hljs.highlightAuto(code).value;
    }
});

module.exports = {

	getPractice: function(req, res) {
	    
	    
		var user = req.session.currentUser;
		var practiceid = req.params.prid;
		//Internal Functions
		getPractice = function (cb)
		
		{
			db.loadPractice({
				_id : practiceid
			}, function(err, practice) {
				if(!err) {
					if(practice)
					{
					    
					           if(! (practice._id in actions))
                               {
                                    actions[practice._id] = eval(practice.actions);
                               }
                               db.loadUserConf({uid: user, pid: practice._id}, function(err,userconf)
                               {
                                   if(!err)
                                   {
                                       if(!userconf)
                                       {//lo añado
                                           var uconf = new UserConf({
                                               uid: user,
                                               pid: practice._id,
                                               config: practice.conf
                                           }) 
                                           
                                           db.saveUserConf(uconf,function(err,uc)
                                           {
                                                if(!err)
                                                {
                                                    cb(null, practice);
                                                }
                                                else
                                                {
                                                    cb(err,null);
                                                }    
                                           });
                                            
                                       }else
                                       {
                                           cb(null,practice);
                                       }
                                       
                                       
                                   }
                                   else
                                   {
                                      cb(err, null); 
                                   }
                                   
                               })
                               
					}
					
				} else
					cb(err, null);
			});
		}
		
		
		
		getBlocks = function (practice,cb) {
			

			db.loadBlocks({
				_id : {
					$in : practice.content
				}
			}, function(err, blocks) {
				if(err) {
					log.error('Error loading blocks for practice ' + practiceid);
					cb(err, blocks,practice);
				} else {
					cb(null, blocks, practice);
				}
		
			});
		}
		
		filterBlocks = function (blocks,practice, cb) {
			var editable = [];
			var editableid = [];
			var noteditable = [];
			for(var i in blocks) {
				if(blocks[i].editable == true) {
					editable.push(blocks[i]);
					editableid.push(blocks[i]._id);
					
					
				} else {
					noteditable.push(blocks[i]);
				}
		
			}
			//console.log(blocks);
			db.loadUserBlocks({
				uid: user,
				defblock : {
					$in : editableid
				}
			}, function(err, userb) {
				if(err) {
				    
					log.error('Error loading user (' + user + ') blocks for practice ' + practiceid);
					cb(err, userb, editable, noteditable, practice);
				} else {
				    //console.log(editable);
				    //console.log(userb);
					cb(null, userb, editable, noteditable, practice);
				}
		
			});
		
		}
		
		getUserBlocks = function (userb,originaleditables,noteditables,practice,cb) {
		    
		   
		    var usereditables = [];
		    //comparar los userblock con los editables
		    //console.log(originaleditables);
		    //console.log(userb);
		    if(userb.length == 0 && originaleditables.length == 0)
		    {
		        //se acabo, no hay bloques editables por tanto devuelvo lo mismo
		        cb(null, userb,usereditables, noteditables, practice);
  
		    }
		    else if(userb.length == 0 && originaleditables.length > 0)
		    { //es mi primera vez 
		        for(var b=0 ;b<originaleditables.length;b++)
		        {
		              //console.log(originaleditables[b].b_tag)
		              switch(originaleditables[b].type)
                      {
                            case "Code":
                                 block = new Block.Code({
                                             editable:      originaleditables[b].editable 
                                           , buttons:       originaleditables[b].buttons 
                                           , content:       originaleditables[b].content
                                           , b_tag:         originaleditables[b].b_tag
                                           , checkbutton:   originaleditables[b].checkbutton
                                  })
                            break;
                            case 'MarkDown':
                                block = new Block.MarkDown({
                                             editable:      originaleditables[b].editable 
                                           , buttons:       originaleditables[b].buttons 
                                           , content:       originaleditables[b].content
                                           , b_tag:         originaleditables[b].b_tag
                                           , checkbutton:   originaleditables[b].checkbutton
                                  })
                            break;
                            case "Text":
                                block = new Block.Text({
                                             editable:      originaleditables[b].editable 
                                           , buttons:       originaleditables[b].buttons 
                                           , content:       originaleditables[b].content
                                           , b_tag:         originaleditables[b].b_tag
                                           , checkbutton:   originaleditables[b].checkbutton
                                  })
                            break;
                      }
                      //for visibility
                      block.editable    = originaleditables[b].editable; 
                      block.buttons     = originaleditables[b].buttons; 
                      block.content     = originaleditables[b].content;
                      block.b_tag       = originaleditables[b].b_tag;
                      block.checkbutton = originaleditables[b].checkbutton;
                      
                      usereditables.push(block);
                      //console.log("-----------"+usereditables+"-----------------");
                      var userblock = new UserBlock({
                            uid : req.session.currentUser,
                            defblock : originaleditables[b]._id,
                            ublocks : block._id
                      });
                      userb.push(userblock);
                      
                      db.saveBlock(block,function(err,ub)
                      {   
                            if(err)
                            {       log.trace(err);
                                    return;
                            }
                      });
                        
                        
                      db.saveUserBlock(userblock, function(err, ub1) 
                      {
                                    if(err) {
                                        log.trace(err);
                                        return;
                                    }
                       });
		            
		            }
		        //console.log("2+++++++++"+originaleditables+"++++++++++++++++++++2");
		        cb(null,userb,usereditables,noteditables,practice)
		        
		        
		        
		        
		        //me los guardo
		        
		        
		    }
		    else if (userb != 0 && userb.length == originaleditables.length )
		    {//se han cargado todos
		        var ubids=[];
		        for(var i=0;i< userb.length;i++)
		        {
		            ubids.push(userb[i].ublocks);
		        }
		        
		        db.loadBlocks({
                    _id : {
                        $in : ubids
                    }
                }, function(err, ubedit) {
                    if(err) {
                        log.error('Error loading userblocks (' + user + ')  for practice ' + practice.pid);
                        cb(err, userb, ubedit, noteditables, practice);
                    } else {
                        //console.log(ubedit);
                        cb(null,userb, ubedit, noteditables, practice);
                    }
            
                });
		        
		        
		        
		    }
		    else if (userb != 0 && userb.length != originaleditables.length )
            {//algo raro ha pasado pero no hay coherencia entre bloques editables y bloques de usuario
             // para no tener un error tocho lo que hacemos es que los bloques que no se enceuntran se resetean al estado original
                var ubids=[];
                for(var i = 0; i < originaleditables.length; i++) 
                {
                        var exist = false;
                        for(var j = 0; j < userb.length; j++) 
                        {
                            if(userb[j].defblock.toString() == originaleditables[i]._id.toString()) 
                            {
                                ubids.push(userb[j].ublocks);
                                exist = true;
                                break;
                            }
                        }
            
                        if(!exist) 
                        {
                             // console.log(originaleditables[i].content);
                              switch(originaleditables[i].type)
                              {
                                    case "Code":
                                         block = new Block.Code({
                                                     editable:      originaleditables[i].editable 
                                                   , buttons:       originaleditables[i].buttons 
                                                   , content:       originaleditables[i].content
                                                   , b_tag:         originaleditables[i].b_tag
                                                   , checkbutton:   originaleditables[i].checkbutton
                                                   
                                          })
                                    break;
                                    case 'MarkDown':
                                        block = new Block.MarkDown({
                                                     editable:      originaleditables[i].editable 
                                                   , buttons:       originaleditables[i].buttons 
                                                   , content:       originaleditables[i].content
                                                   , b_tag:         originaleditables[i].b_tag
                                                   , checkbutton:   originaleditables[i].checkbutton
                                                
                                          })
                                    break;
                                    case "Text":
                                        block = new Block.Text({
                                                     editable: originaleditables[i].editable 
                                                   , buttons:  originaleditables[i].buttons 
                                                   , content:  originaleditables[i].content
                                                   , b_tag:    originaleditables[i].b_tag
                                          })
                                    break;
                              }
                              
                              block.editable    = originaleditables[i].editable; 
                              block.buttons     = originaleditables[i].buttons; 
                              block.content     = originaleditables[i].content;
                              block.b_tag       = originaleditables[i].b_tag;
                              block.checkbutton = originaleditables[i].checkbutton;
                              
                              usereditables.push(block);
                              
                              var userblock = new UserBlock({
                                        uid : userid
                                      , defblock : originaleditables[i]._id
                                      , ublocks : block._id
                              });
                      
                              userb.push(userblock);
                              
                              db.saveBlock(block,function(err,ub)
                              {   
                                    if(err)
                                    {
                                            log.trace(err);
                                            return;
                                    }
                              });
                                
                          
                              db.saveUserBlock(userblock, function(err, ub1) 
                              {
                                            if(err) {
                                                log.trace(err);
                                                return;
                                            } else {
                                                log.debug("save succes userblock " + user + " " + ub1.defblock);
                                            }
                               });
                            
                            
                        }
                }
                
                
                 db.loadBlocks({
                    _id : {
                        $in : ubids
                    }
                }, function(err, ubedit) {
                    if(err) {
                        log.error('Error loading userblocks (' + user + ')  for practice ' + practice._id);
                        cb(err, userb, ubedit, noteditable, practice);
                    } else {
                        //console.log(usereditables);
                        cb(null,userb, ubedit.concat(usereditables), noteditable, practice);
                    }
            
                });
                
           
           
           
            }
		    
		}
		reorderBlocks = function (ubl,editable, noteditable, practice, cb) {
		    
			finalblocks = [];
			//console.log(editable);
			for(var b =0 ; b<practice.content.length;b++)
			{
			    var blockid = practice.content[b];
			    var found = false;
			   // console.log("Busco: "+blockid);
			    //buscar en noteeditable
			    for(var ne=0;ne<noteditable.length;ne++)
			    {
			        
			       // console.log(ne+" " + noteditable[ne]._id);
			        if(noteditable[ne]._id.toString() == blockid.toString())
			        {//lo he encontrado
			            //console.log("-------------------------")
			            finalblocks.push(noteditable[ne]);
			            found =true;
			            break;
			            
			        }
			        
			    }
			    
			    if(found) continue;
			    
			    for(var e=0;e<ubl.length;e++)
                {
                    
                                   
                    if(blockid.toString() == ubl[e].defblock.toString())
                        {
                            for(var k in editable)
                            {
                                if(ubl[e].ublocks.toString() == editable[k]._id.toString())
                                {
                                    finalblocks.push(editable[k])
                                    // console.log(editable[k].checkbutton)
                                    
                                }
                                
                            }
                        }
                    
                }
			      
			    
			    
			}

			cb(null, finalblocks, practice);
		}
		
		
		sendResult = function (err, finalblocks, practice) {
			if(!err) {
			   // console.log(finalblocks)
				//var options = {};
				//var fn = jade.compile(practice.jadeTemplate, options);
				var locals = {
				    practiceid: practice._id,
					title : practice.title,
					longtitle : practice.longtitle,
					exList : finalblocks,
					md: marked
				};
				//res.send(fn(locals));
				res.render('practice.jade',locals)
			}
		}


		//console.log(user + "      " + practiceid);

		async.waterfall([	  getPractice
							, getBlocks							
							, filterBlocks
							, getUserBlocks
							, reorderBlocks
						]	, sendResult)
						
						
	   
		
	},

    getActions:  function()
    {
        return actions;
    }
    /*,
    
    checkAdmin: function(req, res)
    {
        DB.loadUser({email: req.param('email')}, function(err,u)
        {
            if(!err && u)
            {
                if(u.type=="admin")
                {
                    return true;
                    
                }
                
            }
            
            return false;
            
                
        })
        
        
    }*/
    
  
  
  
  
};


