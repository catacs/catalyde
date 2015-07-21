// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// dependencies for authentication
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');
var LoginEntry = require('./models/loginentry');
var Block = require('./models/block');
var UserBlock = require('./models/userblock');
var Group = require('./models/group');
var Practice = require('./models/practice');
var UserOptions = require('./models/useroptions');
var UserConf = require('./models/userconfig');
var PasswordReset = require('./models/passwordreset');
var PublicFile = require('./models/publicfile');
var PrivateFile = require('./models/privatefile');

// Define local strategy for Passport
passport.use(new LocalStrategy({
	usernameField : 'email'
}, function(username, password, done) {
    	User.authenticate(username, password, function(err, user,info) {
    	    if(!user)
    	       return done(err, user,info.message);
    	    else
    	    	return done(err, user);
    	});
}));

// serialize user on login
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// deserialize user on logout
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// connect to database
module.exports = {

	// initialize DB
	startup : function(dbToUse) {
		mongoose.connect(dbToUse, function(err)
		  {
		      if(err) 
		          log.trace(err);
		  });
		// Check connection to mongoDB
		mongoose.connection.on('open', function() {
			log.info('We have connected to mongodb');
		});

	},
	// disconnect from database
    closeDB : function() {
        mongoose.disconnect();
    },
	//save a login entry
	saveLoginEntry : function(loginInfo, callback) {

		var newLoginEntry = new LoginEntry({
			email : loginInfo.email,
			time : loginInfo.time,
			hostIP : loginInfo.hostIP
		});

		newLoginEntry.save(function(err) 
		{
			if(err)
			{ 
			     log.error("Failed saving login entry");
			     return callback(err, null);
			}
			else
			     return callback(null, loginInfo);

		});

	},
	// save a user
	saveUser : function(userInfo, callback) {
		
		var newUser = new User({
			name : {
				first : userInfo.fname,
				last : userInfo.lname
			},
			type : userInfo.type,
			email : userInfo.email,
			groups: userInfo.groups,
			password : userInfo.password
		});

		newUser.save(function(err) {
			if(err) 
			{
			    log.error('User: Failed ' + newUser.email+" \n"+err);
				return callback(err, null);
			}
			else{
			    log.info('User: added ' + newUser.email);
                return callback(null, userInfo); 
			}

		});
	},
	updateUser : function(user, callback) {
        
        var newUser = new User(user);
        newUser.remove(function(err) {
            if(err) {
                if(newUser._id)
                    log.error('User updating:  Failed removing user' + newUser._id );
                else
                    log.error('User updating:  Failed removing user');
                return callback(err, null);
            }
            log.info('User updating:  user '+ user._id+' removed');
            newUser.save(function(err) {
                if(err) {
                    if(newUser._id)
                        log.error('User updating:   Failed saving user '+ newUser._id);
                    else
                        log.error('Block updating:   Failed saving user ');
                    return callback(err, null);
                }
                log.info('User updating: ' + newUser._id+' saved');
                return callback(null, newUser);
            });

        });
    },
	
	loadUser : function(query, callback) {
		
			User.findOne(query, function(err, user) {
			if(err)
			{     
			    log.error("Failed loading user from database")
				return callback(err, user);
			}
			else
			    return callback(null, user);
		});
		
	},
	loadUsers : function(query, callback) {
        
            User.find(query, function(err, users) {
            if(err)
            {
                log.error("Failed loading users from database")
                return callback(err, null);
            }
            else
                return callback(null, users);
        });
        
    },
	//saving new block
	saveBlock : function(block, callback) {
	    //block.content = new Buffer(block.content).toString('base64');
		var newBlock = new Block(block);
		// convert content to base64
		newBlock.save(function(err) {
			if(err) 
			{
				if(newBlock._id)
					log.error('Block saving:  Failed saving block ' + newBlock._id);
				else
					log.error('Block saving:  Failed saving block');
				return callback(err, null);
			}
			else
			{
			             
                log.warn('Block:  block '+ newBlock._id+' saved');
                return callback(null, newBlock);
              
			    
			}

			
		});
	},
	//updating block
	updateBlock : function(block, callback) {
	    //block.content = new Buffer(block.content).toString('base64');
		var newBlock = new Block(block);
		newBlock.remove(function(err) {
			if(err) {
				if(newBlock._id)
					log.error('Block updating:  Failed removing block' + newBlock._id );
				else
					log.error('Block updating:  Failed removing block');
				return callback(err, null);
			}
			else
			{
    			log.info('Block updating:  block '+ newBlock._id+' removed');
    			newBlock.save(function(err) {
    				if(err) {
    					if(block._id)
    						log.error('Block updating:   Failed saving block '+ newBlock._id);
    					else
    						log.error('Block updating:   Failed saving block ');
    					return callback(err, null);
    				}
    				log.info('Block updating: ' + newBlock._id+' saved');
    				return callback(null, newBlock);
    			});
            }
		});
	},
	//deleting block
	removeBlock: function(block, callback) {
		var newBlock = new Block(block);
		newBlock.remove(function(err) {
			if(err) 
			{
				if(newBlock._id)
					log.error('Block removing:  Failed removing block' + newBlock._id );
				else
					log.error('Block removing:  Failed removing block');
				return callback(err, null);
			}
			else
			{
    			log.info('Block removing:  block '+ newBlock._id+' removed');
    			return callback(null, newBlock);
    		}
		});
	},

	//load a block
	loadBlock : function(query, callback) {
		Block.findOne(query, function(err, b) {
			if(!err)
			{
				if(b)
				{
				
					if(b.type == "Code")
					{
						var bl=new Block.Code(b);
						bl.b_tag=b.b_tag;
	  					bl.editable=b.editable;
	  					bl.buttons=b.buttons;
	  					bl.checkbutton=b.checkbutton;
	  					//console.log(bl.bid+" "+bl.editable+" "+bl.buttons+" "+bl.content+" "+bl.type);
						callback(null, bl);
						
					}
					else if(b.type == "MarkDown")
					{
						var bl=new Block.MarkDown(b);
						bl.b_tag=b.b_tag;
	  					bl.editable=b.editable;
	  					bl.buttons=b.buttons;
	  					bl.checkbutton=b.checkbutton;
						//console.log("block loaded "+ b.bid+" content"+b.content);
						callback(null, bl);
					}
					else if(b.type == "Text")
					{
						var bl=new Block.Text(b);
						bl.b_tag=b.b_tag;
	  					bl.editable=b.editable;
	  					bl.buttons=b.buttons;
	  					bl.checkbutton=b.checkbutton;
						//console.log("block loaded "+ b.bid+" content"+b.content);
						callback(null, bl);
					}
					
					//convert block to utf8
					
					//bl.content = new Buffer(bl.content, 'base64').toString('utf8');
					
					
				}
				else
				{
				    log.error("Failed loading block")
					return callback(null,null);
				}
			}
		});
		
	},
	//load blocks
	loadBlocks : function(query, callback) {
		Block.find(query, function(err, block) {
		 if(!err)
		 {
			var blocks = [];
			for(var b in block)
			{
				if(block[b].type == "Code")
				{
					var bl=new Block.Code(block[b]);
					bl.b_tag=block[b].b_tag;
  					bl.editable=block[b].editable;
  					bl.buttons=block[b].buttons;
  					bl.checkbutton= block[b].checkbutton;
  					//content=bl.content;
  					//bl.content = "";
  					//bl.content = new Buffer(content, 'base64').toString('utf8');
					//console.log(bl.bid+"\n"+bl.editable+"\n"+bl.buttons+"\n"+bl.type+"\n"+bl.content);
					
					blocks.push(bl);
					//console.log(blocks[blocks.length-1].content);
				}
				else if(block[b].type == "MarkDown")
				{
					var bl=new Block.MarkDown(block[b]);
					bl.b_tag=block[b].b_tag;
  					bl.editable=block[b].editable;
  					bl.buttons=block[b].buttons;
  					bl.checkbutton= block[b].checkbutton;
  					//bl.content = new Buffer(bl.content, 'base64').toString('utf8');
					//console.log("block loaded "+ b.bid+" content"+b.content);
					//console.log(bl.bid+"\n"+bl.editable+"\n"+bl.buttons+"\n"+bl.type+"\n"+bl.content);
					blocks.push(bl);
				}
				else if(block[b].type == "Text")
				{
					var bl=new Block.Text(block[b]);
					bl.b_tag=block[b].b_tag;
  					bl.editable=block[b].editable;
  					bl.buttons=block[b].buttons;
  					bl.checkbutton= block[b].checkbutton;
  					//bl.content = new Buffer(bl.content, 'base64').toString('utf8');
					//console.log("block loaded "+ b.bid+" content"+b.content);
					//console.log(bl.bid+"\n"+bl.editable+"\n"+bl.buttons+"\n"+bl.type+"\n"+bl.content);
					blocks.push(bl);
				}
				
			}
			
			return callback(null, blocks);
		}
		else
		{
		     log.error("Failed loading blocks")
		     return callback(err, null);
		}
		});
	},
	//save group
	saveGroup : function(group, callback) {
		var newGroup = new Group(group);

		newGroup.save(function(err) {
			if(err) {
				if(group._id)
					log.error('Group saving: Failed saving group '+ group._id);
				else
					log.error('Group saving: Failed saving group');
					
				return callback(err, null);
			}
			else
			{
			    log.info('Group saving:  group '+ group._id +' saved');
                callback(null, group);
			    
			}

		});
	},
	//update group function
	updateGroup : function(group, callback) {
		var newGroup = new Group(group);
		newGroup.remove(function(err) {
			if(err) {
				if(group._id)
					log.error('Group updating: Failed removing group '+ group._id);
				else
					log.error('Group updating: Failed removing group');
				return callback(err, null);
			}
			else
			{
    			log.info('Group updating: Group '+ group._id+' removed');
    			newGroup.save(function(err) {
    				if(err) {
    					if(group._id)
    						log.error('Group updating: Failed saving group '+ group._id);
    					else
    						log.error('Group updating: Failed saving group');
    					return callback(err, null);
    				}else
    				{
    				    log.info('Group updating: Group '+ group._id+ ' saved');
                        return callback(null,group);
    				}

    			});
    			//callback(null, group);
		    }
		});

	},
	//deleting group
	removeGroup: function(group, callback) {
		var newGroup= new Group(group);
		newGroup.remove(function(err) {
			if(err) {
				if(group._id)
					log.error('Group removing: Failed removing group '+ group._id);
				else
					log.error('Group removing: Failed removing group');
				return callback(err);
			}else
			{
    			log.error('Group removing: Group '+ group._id+' removed');
    			return callback(null);
			}
		});
	},
	//load a group
	loadGroup : function(query, callback) {
		Group.findOne(query, function(err, group) {
			if(!err)
				callback(null, group);
			else
			{
			    log.error("Failed loading group");
				return callback(err,null);
			}
				
		});
	},
	//load  groups
	loadGroups : function(query, callback) {
		Group.find(query, function(err, groups) {
		    if(err)
		    {
		          log.error("Failed loading groups");
		          return callback(err,groups);
		    }
		    else
		          return callback(null,groups);
		});
	},
	//save group
	savePractice : function(practice, callback) {
		var newPractice = new Practice(practice);

		newPractice.save(function(err) {
			if(err) {
				if(practice._id)
					log.error('Practice saving: Failed saving practice '+ practice._id);
				else
					log.error('Practice saving: Failed saving practice');
				return callback(err, null);
			}
			else
			{
    			log.warn('Practice saving: Practice '+practice._id+' saved');
    			return callback(null, practice);
    		}
		});
	},
	//update group function
	updatePractice : function(practice, callback) {
		var newPractice = new Practice(practice);
		newPractice.remove(function(err) {
			if(err) {
				if(practice._id)
					log.error('Practice updating: Failed removing practice '+ practice._id);
				else
					log.error('Practice updating: Failed removing practice');
				return callback(err, null);
			}
			else
			{
    			log.info('Practice updating: Practice '+ practice._id+ " removed");
    			newPractice.save(function(err) {
    				if(err) {
    					if(practice._id)
    						log.error('Practice updating: Failed saving practice '+ practice._id);
    					else
    						log.error('Practice updating: Failed saving practice');
    					return callback(err, null);
    				}
    				else
    				{
        				log.info('Practice updating: Practice '+ practice._id+ " saved");	
        				return callback(null, practice);
    				}
    			});
			}
		});

	},
	//deleting practice
	removePractice: function(practice, callback) {
		var newPractice = new Practice(practice);
		newPractice.remove(function(err) {
			if(err) {
				if(practice._id)
					log.error('Practice removing: Failed removing practice '+ practice._id);
				else
					log.error('Practice removing: Failed removing practice');
				return callback(err);
			}
			else
			{
    			log.info('Practice removing: Practice '+ practice._id+ " removed");
    			return callback(null);
			}
		});
	},
	
	//load a practice
	loadPractice : function(query, callback) {
		Practice.findOne(query, function(err, practice) {
		    if(!err)
			     callback(null, practice);
			else
			{
			     log.error("Failed loading practice");
			     callback(err,null);
			}
		});
	},
	
	loadPractices : function(query, callback) {
		Practice.find(query, function(err, prs) {
		    if(!err)
			     callback(null, prs);
			else
			{
                 log.error("Failed loading practices");
                 callback(err,null);
            }
		});
	},
	
	//saving new block
	saveUserBlock : function(block, callback) {
		var newblock = new UserBlock(block);
		newblock.save(function(err) {
			if(err) {
				if(block.uid)
					log.error('UserBlock saving: Failed saving userblock '+ block.uid);
				else
					log.error('UserBlock saving: Failed saving group');
				return callback(err, null);
			}
			else
			{
    			log.info('UserBlock saving: Userblock '+ block.uid+ ' saved');
    			return callback(null, block);
			}
		});
	},
	//updating block
	updateUserBlock : function(userblock, callback) {
		var newBlock = new UserBlock(userblock);
		
		newBlock.remove(function(err) {
			if(err) {
				if(userblock.uid)
					log.error('UserBlock updating: Failed removing userblock '+ block.uid);
				else
					log.error('UserBlock updating: Failed removing userblock');
				return callback(err, null);
			}
			else
			{
    			log.info('UserBlock updating: UserBlock '+ userblock.uid+ " removed");
                newBlock.save(function(err) {
                        if(err) {
                            if(userblock.uid)
                                log.error('UserBlock updating: Failed saving userblock '+ block.uid);
                            else
                                log.error('UserBlock updating: Failed saving group');
                            return callback(err, null);
                        }
                        else
                        {
                            log.info('UserBlock updating: user block '+ userblock.uid + ' saved');
                            return callback(null, userblock);
                        }
                });
			    
			}

			
		});

	},
	
	//deleting user block
	removeUserBlock: function(userblock, callback) {
		var newBlock = new UserBlock(userblock);
		newBlock.remove(function(err) {
			if(err) {
				if(userblock.uid)
					log.error('UserBlock removing: Failed removing userblock '+ block.uid);
				else
					log.error('UserBlock removing: Failed removing userblock');
				return callback(err, null);
			}
			else
			{
    			log.info('UserBlock removing: Userblock '+ userblock.uid+' removed');
    			return callback(null, userblock);
			}
		});
	},

	//load a block
	loadUserBlock : function(query, callback) {
		UserBlock.findOne(query, function(err, userblock) {
		    if(!err)
		    {
			     return callback(null, userblock);
			}
			else
			{
			    log.error('Failed loading userblock');
			    return callback(err, null);
			}
		});
	},
	
	//load blocks
	loadUserBlocks : function(query, callback) {
		UserBlock.find(query, function(err, userblock) {
			if(!err)
            {
                 return callback(null, userblock);
            }
            else
            {
                log.error('Failed loading userblocks');
                return callback(err, null);
            }
		});
	},

	// get all the users
	getUsers : function(callback) {
		User.find({}, ['name', '_id'], function(err, users) {
		    if(!err)
			     return callback(null, users);
			else
			{
			     log.info('Failed loading users');
			     return callback(err, null);
			}
		});
	},
		//save userconf
	saveUserConf : function(userConf, callback) {
		var newUserConf = new UserConf(userConf);

		newUserConf.save(function(err) {
			if(err) {
				if(userConf)
					log.error('UserConf for practice '+ userConf.pid+' and user '+userConf.uid +': Failed saving userconf '+ userConf._id);
				else
					log.error('UserConf saving: Failed saving userConf ');
				return callback(err, null);
			}
			else
			{
			    log.info('UserConf saving:  group '+ userConf._id +' saved');
                return callback(null, userConf);
  
			}
		});
	},
	//update userconf  function
	updateUserConf: function(userConf, callback) {
		var newUserConf = new UserConf(userConf);
		newUserConf.remove(function(err) {
			if(err) {
				if(userConf._id)
					log.error('UserConf updating: Failed removing userconf '+ userConf._id);
				else
					log.error('UserConf updating: Failed removing userconf');
				return callback(err, null);
			}else
			{
    			log.info('UserConf updating: userconf '+ userConf._id +' removed');
    			newUserConf.save(function(err) {
    				if(err) {
    					if( userConf._id)
    						log.error('UserConf updating:  Failed saving userconf '+ userConf._id);
    					else
    						log.error('UserConf updating:  Failed saving userconf');
    					return callback(err, null);
    				}
    				log.info('UserConf updating:  userconf '+ userConf._id+ ' saved');
    				return callback(null);
    			});
    			//callback(null, userConf);
			}
		});

	},
	//deleting userconf
	removeUserConf: function(userConf, callback) {
		var newUserConf = new UserConf(userConf);
		newUserConf.remove(function(err) {
			if(err) {
				if(userConf._id)
					log.error('Userconf removing: Failed removing userconf '+ userConf._id);
				else
					log.error('Userconf removing: Failed removing userconf');
				return callback(err);
			}
			else
			{
    			log.info('Userconf removing: userconf '+userConf._id+' removed');
    			return callback(null);
    		}
		});
	},
	//load a user conf for a practice
	loadUserConf : function(query, callback) {
		UserConf.findOne(query, function(err, userconf) {
			if(!err)
				return callback(null, userconf);
			else
			{   
			    log.error('Failed loading userconf');
			    return callback(err, null);
			}
		});
	},
	loadPasswordReset : function(query, callback) {
        PasswordReset.findOne(query, function(err, passreset) {
            if(!err)
                return callback(null, passreset);
            else
            {   
                log.error('Failed loading userconf');
                return callback(err, null);
            }
        });
    },    
    savePasswordReset : function(obj, callback) {
        obj.save(function(err) {
            if(err) {
                if(obj)
                    log.error('Password Reset: Failed saving userconf '+ obj._id);
                else
                    log.error('UserConf saving: Failed saving password reset ');
                return callback(err, null);
            }
            else
            {
                log.info('Password reset saving:  entry '+ obj._id +' saved');
                return callback(null, obj);
  
            }
        });
    },
    removePasswordReset: function(passwordReset, callback) {
        passwordReset.remove(function(err) {
            if(err) {
                if(passwordReset._id)
                    log.error('Password reset removing: Failed removing Password reset '+ passwordReset._id);
                else
                    log.error('Password reset removing: Failed removing Password reset');
                return callback(err);
            }
            else
            {
                log.info('Password reset removing: Password reset '+passwordReset._id+' removed');
                return callback(null);
            }
        });
    },
    loadPublicFile : function(query, callback) {
        PublicFile.findOne(query, function(err, file) {
            if(!err)
                return callback(null, file);
            else
            {   
                log.error('Failed loading file');
                return callback(err, null);
            }
        });
    },    
    savePublicFile : function(file, callback) {
        file.save(function(err) {
            if(err) {
                if(file)
                    log.error('File saving: Failed saving file '+ file._id);
                else
                    log.error('File saving: Failed saving file');
                return callback(err, null);
            }
            else
            {
                log.info('File saving:  entry '+ file._id +' saved');
                return callback(null, file);
  
            }
        });
    },
    removePublicFile: function(file, callback) {
        file.remove(function(err) {
            if(err) {
                if(file._id)
                    log.error('File removing: Failed removing file'+ file._id);
                else
                    log.error('File removing: Failed removing file');
                return callback(err);
            }
            else
            {
                log.info('File removing: File '+file._id+' removed');
                return callback(null);
            }
        });
    },
    loadPrivateFile : function(query, callback) {
        PrivateFile.findOne(query, function(err, file) {
            if(!err)
                return callback(null, file);
            else
            {   
                log.error('Failed loading file');
                return callback(err, null);
            }
        });
    },    
    savePrivateFile : function(file, callback) {
        file.save(function(err) {
            if(err) {
                if(file)
                    log.error('File saving: Failed saving file '+ file._id);
                else
                    log.error('File saving: Failed saving file');
                return callback(err, null);
            }
            else
            {
                log.info('File saving:  entry '+ file._id +' saved');
                return callback(null, file);
  
            }
        });
    },
    removePrivateFile: function(file, callback) {
        file.remove(function(err) {
            if(err) {
                if(file._id)
                    log.error('File removing: Failed removing file'+ file._id);
                else
                    log.error('File removing: Failed removing file');
                return callback(err);
            }
            else
            {
                log.info('File removing: File '+file._id+' removed');
                return callback(null);
            }
        });
    }
    
}