
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
        
        var users = [];

        //console.log(conn);
        DB.startup(conn);
        
        var users = JSON.parse(fs.readFileSync(file,'utf8'));
        
        checkUserInfo = function(user)
        {
            if(user["fname"] == undefined || user["fname"]=="")
            {
                
                 return false;
                
            }
            if(user["lname"] == undefined || user["lname"]=="")
            {
                
                 return false;
                
            }
            if(user["type"] == undefined || user["type"]=="")
            {
                
                 return false;
                
            }
            if(user["email"] == undefined || user["email"]=="")
            {
                
                 return false;
                
            }
            if(user["password"] == undefined || user["password"]=="")
            {
                
                 return false;
                
            }
            
            return true;
        }
        
        var user=users.users;
        console.log(user)
        var ok=0;
        for(var u in user)
        {
            if(checkUserInfo(user[u]))
            {
                 ok++;
            }
        }
        
        if(ok==user.length)
        {
            
            for(var u in user)
            {
                    DB.saveUser(user[u],function(err,us){});
            }
            
        }
        else
        {
            return;
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
