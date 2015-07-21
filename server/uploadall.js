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
var Group = require("./models/group.js");


// diccionario para asociar al texto de un grupo su id en mongo
var groupId = {};

// crear un diccionario grupo -> id del grupo

function nonEmpty(what) {
  return what != undefined && what != "";
}

function upload_groups(groups,callback) {
  
  //        var groups = JSON.parse(fs.readFileSync(file,'utf8'));
  function checkGroupInfo(group) {
    return (nonEmpty(group["description"]));
  }
  function checkGroups(group) {
    for (var u in group) {
      if (!checkGroupInfo(group[u]))
	return false;
    }
    return true;
  }
  console.log(groups)
  if (checkGroups(groups)) {
    var count = groups.length;
    for(var u in groups) {
      console.log("groups[u]",groups[u]);
      var the_group = new Group(groups[u]);
      DB.saveGroup(the_group,function(err,gr){
	if(err)
	  throw err;
	console.log("jarllllllll",gr.description,gr._id);
	groupId[gr.description] = gr._id;
	count--;
	if (count == 0) {
	  callback();
	}
      });
    }
  }
}

function list_users(users) {
  for(var u in users) {
    console.log("\item Login:\texttt{"+users[u].email+"} Password: \texttt{"+users[u].password+"}");
  }
}

function upload_users(users,callback) {
  //        var users = JSON.parse(fs.readFileSync(file,'utf8'));
  function checkUserInfo(user) {
    return (nonEmpty(user["fname"]) &&
	    nonEmpty(user["lname"]) &&
	    nonEmpty(user["type"]) &&
	    nonEmpty(user["email"]) &&
	    nonEmpty(user["password"]));
  }
  function checkUsers(user) {
    for (var u in user) {
      if (!checkUserInfo(user[u]))
	return false;
    }
    return true;
  }
  console.log(users)
  if (checkUsers(users)) {
    var count = users.length;
    for(var u in users) {
      // procesar los grupos del usuario
      var los_grupos = users[u].groups;
      users[u].groups = [];
      for (j in los_grupos) {
	users[u].groups.push(groupId[los_grupos[j]]);
      }
      DB.saveUser(users[u],function(err,us){
	if(err)
	  throw err;
	count--;
	if (count == 0) {
	  callback();
	}
      });
    }
  }
}

program
//.version(packageJSON.version)
  .option('-H, --host <ip_address>', 'only accept traffic directed to a specific ip')
  .option('-p, --port <number>', 'use a custom http port')
  .option('-f, --file <file>', 'file with users')
  .option('-D, --dbtype <dbtype>', 'db to upload development/production')

program
  .command('listen [directory]')
  .action(function(dir){
    // Work around name collision caused by "password" function provided by commander
    var host = program.host instanceof Function ? undefined : program.host
    var port = program.port instanceof Function ? undefined : program.port
    var file = program.file instanceof Function ? undefined : program.file
    var dbtype = program.dbtype instanceof Function ? "development" : program.dbtype
    
    conn='mongodb://'+host+'/Catalyde-dev';
    
    if(dbtype == "production")
      conn = conn='mongodb://'+host+'/Catalyde';
    console.log(dbtype+" "+ conn)    
    DB.startup(conn);
    
    var jsondata = JSON.parse(fs.readFileSync(file,'utf8'));
    list_users(jsondata['users']);
    upload_groups(jsondata['groups'], function () {
      // esperar a tener todos los grupos
      upload_users(jsondata['users'], function () {
    	DB.closeDB();
      });
    })
  })

if (process.argv.length > 2) {
  if (process.argv[2].charAt(0) == '-') {
    process.argv.splice(2, 0, 'listen')
  }
  program.parse(process.argv);
} else {
  console.log("must provide arguments")
}

