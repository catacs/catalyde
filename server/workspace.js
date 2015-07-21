
var EventEmitter = require('events').EventEmitter;
var fs = require('fs-extra');
var path =  require("path")
var code = require('./generatecode');
var execFile = require('child_process').execFile;
var pty =  require("pty.js");
var ptmx = require("./execution_module/lib/ptmx.js");
var sandbox = "sandbox";
//var process = {};
var userInfo = {};
var handler = {};

handler['compile'] = {};
handler['run'] = {};

var defaultCompileErrHandler = function(uid,err){
  if (err.indexOf("error: ") >= 0) {
    err = err.substring(err.indexOf("error: ")+"errr: ".length,err.length)
  }
  err = err.replace("error generated","error generado")
  err = err.replace("errors generated","errores generados")
  err = err.replace("after expression","tras la expresion")
  err = err.replace("expected","esperado/a")
  err = err.replace(" and "," y ")
  err = err.replace("warning","advertencia")
  err = err.replace(" use "," uso ")
  err = err.replace(" of "," de ")
  err = err.replace("undeclared identifier","identificador no declarado")
  err = err.replace("(use -v to see invocation)","")
  err = err.replace("linker command failed with exit code 1","fallo al linkar")
  log.debug("Program of user " + uid + " compilation error:\n" + err);
  userInfo[uid].config.sock.emit("error",{user: uid, error: err})
}

var defaultCompileSuccessfulHandler = function(uid,stdout){
  log.debug("Program of user " + uid + " compilation succesful:\n" + stdout);
  userInfo[uid].config.sock.emit("success",{user: uid, out: stdout, handler:userInfo[uid].config.run.handler})
}
handler.compile['default'] =  defaultCompileErrHandler;
handler.compile['successfulHandler'] = defaultCompileSuccessfulHandler; 


/*
 * userInfo[userid].userWorkspace =""
 * userInfo[userid].termEE =""
 * userInfo[userid].connection{ masterfd: "fd", 
 *                              slave: "string"
 *                            }
 * userInfo[userid].config{ code: {
 *                                              files: [],
 *                                              templates: [["p1.dust","program.c"]]
 *     
 *                          }
 *                          compile: {
 *                                      compiler: "clang",
 *                                      compileArgs: ["-o program","program.c"],
 *                                      compileSuccesfulHandler: "default",
 *                                      compileErrorHandler: "default",
 *                          },
 *                          run:{   
 *                                  runCommand:"./program",
 *                                  errorHandler: "default",
 *                                  interactive: true,
 *                                  handler: "terminal"
 *                          }
 *                      }
 * 
 * 
 */

// No hace falta una nueva conexión a la db ya que tenemos acceso a la conexión que crea el server
//var DB = require('./db');
//DB.startup(conn)
//var conn = 'mongodb://localhost/ACEditor';

_this  = this;

//exports.shouldDisplayWelcome = false


exports.init = function()
{	
  cleanSandbox()
}

var cleanSandbox =  function()
{
  fs.removeSync(sandbox);
  fs.mkdirSync(sandbox);
}

var setUserConfig = function(userid,options)
{
  //userInfo[userid].config = userInfo[userid].config || {};
  userInfo[userid].config.code = {};
  userInfo[userid].config.compile = {};
  userInfo[userid].config.run = {};
  //generation code options
  userInfo[userid].config.code['files'] = options.files;
  userInfo[userid].config.code['templates'] = options.templates;
  
  //compilation options
  userInfo[userid].config.compile['compiler'] = options.compiler;
  userInfo[userid].config.compile['compileArgs'] = options.compileArgs;
  userInfo[userid].config.compile['errorHandler'] = options.compileErrorHandler;

  //running options
  userInfo[userid].config.run['runCommand'] = options.runCommand;
  userInfo[userid].config.run['errorHandler'] =  options.runErrorHandler;
  userInfo[userid].config.run['interactive'] = options.interactive;
  userInfo[userid].config.run['handler']= options.handler;
}

exports.list= function (group)
{
  var ee = new EventEmitter();
  DB.loadGroup({_id: group.id}, function(err,gr){
    if(!err && gr)
    {
      DB.loadPractices({_id: { $in: gr.practices}},function(err,practices)
		       {
			 //do not send everything remember that the solution is in the dust elements so you musnt send it to client
			 //security
			 var practicesdata = [];
			 
			 for(var p in practices)
			 {
			   practicesdata.push({_id: practices[p]._id, pid: practices[p]._id, title: practices[p].title, content: practices[p].content});
			 }
			 //console.log(practicesdata)
			 ee.emit('success',practicesdata)
			 
		       })
      
    }

    
  })

  return ee;
}

exports.listPractice= function (group)
{
  var ee = new EventEmitter();
  //console.log(group.id);
  DB.loadGroup({_id: group.id}, function(err,gr){
    if(!err && gr)
    {
      DB.loadPractices({_id: { $in: gr.practices}},function(err,practices)
		       {
			 //do not send everything remember that the solution is in the dust elements so you musnt send it to client
			 //security
			 var practicesdata = [];
			 
			 for(var p in practices)
			 {
			   practicesdata.push({_id: practices[p]._id, title: practices[p].title, content: practices[p].content});
			 }
			 
			 ee.emit('success',practicesdata)
			 
		       })
      
    }

    
  })

  return ee;
}


exports.listGroups = function(userid)
{
  var ee = new EventEmitter();
  DB.loadUser({_id: userid},function(err,user){

    if(!err && user)
    {
      DB.loadGroups({_id: { $in: user.groups}},function(err,groups)
	 	    {
	 	      if(!err)
	 		ee.emit('success',groups)
	 	      else
	 	      {
	 		log.trace(err);
	 		ee.emit('error',null);
	 	      }
	 	      
	 	    })
      
    }	 	
    
  })

  return ee;
  
  
}

exports.saveblock = function(userid,block)
{
  var ee = new EventEmitter();
  DB.loadBlock({_id: block.id},function(err,bl1){
    if(!err && bl1)
    {
      
      bl1.content= block.content;
      DB.updateBlock(bl1,function(err,bl2){
        
        if(err)
        {
          ee.emit('error',{err: 'Error actualizando bloque.', message: "Error: El bloque "+ block1._id+" no se ha actualizado correctamente"})
        }
        else
        {
          
        }
        
      })
    }
    else
    {
      ee.emit('error',{err: 'Error cargando bloque.',message: "Error: El bloque "+ block.id+" no se ha cargado correctamente para actualización"})
    }       
    
  })
  return ee;
}

exports.compile = function (data,userid,routes)
{
  var actions = routes.practice().getActions();
  var action = actions[data.practiceid];
  var ee = new EventEmitter();
  
  //acciones
  log.debug(action[data.action](userid));
  
  
  return ee;
  
  
}

exports.executeCompile = function(clientid,args,callbackError,callbackOK) {
  
  var compiler = userInfo[clientid].config.compile.compiler || "clang";
  var compileArgs = userInfo[clientid].config.compile.compileArgs ;
  console.log('Starting directory: ' + process.cwd());
  try {
    
    var child    = execFile(compiler,compileArgs,{cwd: userInfo[clientid].userWorkspace},function(err, stdout, stderr) {
      
      if (err)
        callbackError(clientid,stderr);
      else
        callbackOK(clientid,stdout);
      
      
    });
  }
  catch (err) {
    callbackError(clientid,"Permissions error. "+ err);
  }
};

exports.compile = function(data,options) 
{
  var userid = data.userid;
  var params = data.data;
  
  setUserConfig(userid,options);
  
  var dusts = userInfo[userid].config.code.templates;
  var errHandler = userInfo[userid].config.compile.errorHandler;
  var files = userInfo[userid].config.code.files;
  
  code.generateCode(userid,params.pid,dusts,files,sandbox,function(err)
		    {
		      if(!err)
		      {
			_this.executeCompile(userid,options,
					     handler.compile['default'],
					     handler.compile['successfulHandler'])
                        
		      }
		      else
		      {
			console.log(err)
		      }
                      
		    });
  

};

exports.compileAndRun = function(data,options)
{
  var userid = data.userid;
  var params = data.data;
  
  setUserConfig(userid,options);
  
  
  var dusts = userInfo[userid].config.code.templates;
  var errHandler = userInfo[userid].config.compile.errorHandler;
  var files = userInfo[userid].config.code.files;
  
  code.generateCode(userid,params.pid,dusts,files,sandbox,function(err)
		    {
		      if(!err)
		      {
			_this.executeCompile(userid,options,
					     handler.compile['default'],
					     // handler.compile['errHandler'],
					     handler.compile['successfulHandler'])
		      }else
		      {
			console.log(err)
		      }
                      
		    });
  
}


exports.executeAction = function (userid,data,routes)
{
  var ee = new EventEmitter();
  delete userInfo[userid].config;
  userInfo[userid].config = {};
  userInfo[userid].config.sock = ee;

  var actions = routes.practice().getActions();
  
  if(actions != undefined && actions != null)
  {
    log.debug(action);
    
    var action = actions[data.pid];

    if(action)//preventing older browser tabs opened
    {
      var myaction = action[data.action];
      var args = {};
      args.userid = userid; 
      args.data =  data;
      if(myaction)
      {
        myaction(args,this);
      }
      else
      {
        //ee.emit("error",{error: "action does not exist"});
        log.warn( "action does not exist")
      } 
    }
    else
    {
      //ee.emit("error",{user: "undefined", error: "action does not exist"})
      log.warn( "actions does not exist")
    }                     
    
  }
  else
  {
    //log.debug("noactions")
    //ee.emit("error",{error: "not actions available"});//{user: "undefined", error: "actions does not exist"})
    log.warn( "not actions available")
  }
  
  return ee;
  
  
}

exports.saveConfig = function(userid,pid,tag,value)
{
  var ee = new EventEmitter();
  
  DB.loadUserConf({uid: userid, pid: pid},function(err,userconf)
		  {
		    if(!err)
		    {
		      if(userconf)
		      {
			userconf.config.status[tag]=value;
			DB.updateUserConf(userconf,function(err,uc)
					  {
					    if(err)
					      log.trace(err);
					    
					  })
			
			
		      }
		    }
		    
		    
		  })
  
  
  return ee;
  
}


exports.getConfig = function(userid,pid)
{
  var ee = new EventEmitter();
  DB.loadUserConf({uid: userid, pid: pid},function(err,userconf)
		  {
		    if(!err)
		    {
		      if(userconf)
		      {
			ee.emit('success',userconf.config.status);
		      }
		    }
		    
		    
		  })
  
  
  return ee;
  
}

exports.buildCode = function (userid,practiceid,tag)
{

  code.generateCode(userid,practiceid,tag,sandbox);
  
}


exports.save = function(path, content)
{
  
  var ee = new EventEmitter();
  

  return ee
  
}

// depuracion
var iterador = 0

exports.initUserWorkspace = function(userid)
{
  var userinfo = new Object();

  log.error("USER INFO " + userInfo[userid]);
  if (userInfo[userid] == null || userInfo[userid] == undefined){
      userInfo[userid] = userinfo;
      var userWorkspaceDir=path.normalize(sandbox+"/"+userid);
      //set workspace directory
      console.log(userWorkspaceDir);
      _this.createUserFolder(userWorkspaceDir);
      //save it to later acces
      userInfo[userid].userWorkspace = userWorkspaceDir;
      //create ptmx virtual files
      //
      userInfo[userid].connection = ptmx.exec();

      userInfo[userid].termEE = null;
      iterador++;
      userInfo[userid].connection.execSocket.on('data', function(data) {
          console.log('Iteracion '+iterador+' Data send', data.toString());
          //log.debug('Data send', data.toString());
          if( userInfo[userid].termEE != null)
          userInfo[userid].termEE.emit("print", data);


      });
      userInfo[userid].connection.gdbEE.on('gdb_exit', function(code) {
          log.debug('child process terminated due to receipt of signal ' + code);
          if( userInfo[userid].termEE != null) {
              userInfo[userid].termEE.emit('exit', userInfo[userid].connection.program_signal);
              userInfo[userid].termEE = null;
          }
      });
      //userInfo[userid].config = null;
      console.log(userInfo[userid]);
  }
}

exports.createUserFolder = function(route)
{
    fs.removeSync(route);
    fs.mkdirSync(route);

}

exports.cleanUserFolder = function(userid)
{
    var ee = new EventEmitter();
    fs.remove(sandbox+"/"+userid, function(err){
        if (err) 
    {
        ee.emit('error', null);
    }
        else 
    {
        ee.emit('success', null);
    }
    });
    //fs.removeSync(); 
    delete userInfo[userid];
    return ee;   
}


exports.run=function(userid)
{
    var ee = new EventEmitter();
    console.log("hola");
    userInfo[userid].connection.launch_program_batch(userInfo[userid].userWorkspace+"/"+userInfo[userid].config.run.runCommand);
    ee.emit("success","Proceso Lanzado")
        userInfo[userid].termEE = ee;

    return ee;

}

exports.getProcess=function(userid)
{
    if(userid in userInfo)
        return userInfo[userid].connection;
    else
        return null; 

}

exports.getAllUsers = function()
{
    var ee = new EventEmitter();
    DB.loadUsers({},function(err,users)
            {
                if(!err)
    {
        if(users)
    {
        var userlist= [];
        for (var i in users)
    {
        userlist.push({name: users[i].name, id: users[i]._id })
    }
    ee.emit('success',userlist);
    }
    }


            })


    return ee;

}


exports.getAllPracs = function()
{
    var ee = new EventEmitter();
    DB.loadPractices({},function(err,pracs)
            {
                if(!err)
    {
        if(pracs)
    {

        var praclist= [];
        for (var i in pracs)
    {
        praclist.push({title: pracs[i].title, id: pracs[i]._id })
    }

    ee.emit('success',praclist);
    }
    }


            })


    return ee;

}
exports.getAllGroups = function()
{
    var ee = new EventEmitter();
    DB.loadGroups({},function(err,groups)
            {
                if(!err)
    {
        if(groups)
    {

        var grouplist= [];
        for (var i in groups)
    {
        grouplist.push({description: groups[i].description, id: groups[i]._id })
    }
    ee.emit('success',grouplist);
    }
    }


            })


    return ee;

}
exports.addGroupToUser = function(user,group)
{
    var ee = new EventEmitter();
    DB.loadUser({_id: user},function(err,user)
            {
                if(!err)
    {
        if(user)
    {
        var gexist=false;
        for(var g in user.groups)
    {
        if(group == user.groups[g])
    {
        ee.emit('error',{err: "Group already exist", message: "Group already exist for the user."});
        gexist = true;
    }

    }
    if(gexist ==  false)
    {

        user.groups.push(group);
        DB.updateUser(user,function(err,user)
            {
                if(!err)
            ee.emit('success',{err: null, message: "Group add correctly"});
                else
            ee.emit('error',{err: err, message: "Could not add the group for these user."});
            })
    }


    }
        else
        {
            ee.emit('error',{err: err, message: "User does not exit."});
        }
    }


            })

    return ee;
}


exports.getPracsGroupList= function (groupid)
{
    var ee = new EventEmitter();
    DB.loadGroup({_id: groupid}, function(err,gr){
        if(!err && gr)
    {
        DB.loadPractices({_id: { $in: gr.practices}},function(err,practices)
            {
                //do not send everything remember that the solution is in the dust elements so you musnt send it to client
                //security
                if(!err)
        {
            if(practices)
        {
            var pracslist = [];

            for(var p in practices)
        {
            pracslist.push({id: practices[p]._id, title: practices[p].title});
        }
        //console.log(pracslist)
        ee.emit('success',pracslist) 



        }



        }


            })

    }


    })

    return ee;
}

exports.addPracsToGroup= function(group, practice)
{

    var ee = new EventEmitter();
    DB.loadGroup({_id: group},function(err,gr)
            {
                if(!err)
    {
        if(gr)
    {
        var gexist=false;
        for(var g in gr.practices)
    {
        if(practice == gr.practices[g])
    {
        ee.emit('error',{err: "Practice already exist", message: "Practice already exist for the group."});
        gexist = true;
    }

    }
    if(gexist ==  false)
    {

        gr.practices.push(practice);
        DB.updateGroup(gr,function(err,gr)
            {
                if(!err)
            ee.emit('success',{err: null, message: "Practice added correctly"});
                else
            ee.emit('error',{err: err, message: "Could not add the practice for these group."});
            })
    }


    }
        else
        {
            ee.emit('error',{err: err, message: "Group does not exit."});
        }
    }


            })

    return ee;

}
