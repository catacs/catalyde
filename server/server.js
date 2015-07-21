var express       = require('express'),
    fs            = require('fs'),
    path          = require('path'),
    sockeio       = require('socket.io'),
    workspace     = require('./workspace.js'),
    child_process = require('child_process'),
    passport      = require('passport'),
    mongoStore    = require("connect-mongodb"), 
    parseCookie   = require('connect').utils.parseCookie,
    log4js        = require('log4js'),
    nodemailer    = require("nodemailer"),
    spawn         = require('child_process').spawn,
    execFile      = require('child_process').execFile;
    
DB = require('./db');// al declararlo asi tiene acceso toda la aplicación

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/catalyde.log', category: ['catalyde','console'] }
    ]
});

log = log4js.getLogger('catalyde');
mail =  nodemailer.createTransport("Sendmail");
/* /etc/hosts must have the format ip domainname shortname*/
var server = express.createServer(), 
    http_server='http://'; 

if (path.existsSync('./certs/key.pem') && path.existsSync('./certs/cert.pem')) {
  server = express.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
  });
  http_server='https://'; 
  
  
} else {
  //server = express.createServer();
  //http_server='http://'; 
  log.fatal("SSL certificate does not exist");
  process.exit(-1)
  
}



var conn = 'mongodb://localhost/';
var db; 

var conf = {
 db: {
   db: 'Catalyde',
   host: '127.0.0.1',
   port: 27017,  // optional, default: 27017
 },
 secret: 'hockydocky',
 url: 'mongodb://localhost/Catalyde'
};


        		
exports.listen = function(port, host, username, password, downgrade, launchBrowser) 
{
   
    server.configure('development', function(){
      server.use(log4js.connectLogger(log, { level: log4js.levels.INFO }));
      log.setLevel('INFO');
      log.info("Start development mode.");
      conn+="Catalyde-dev";
      /* node main.js */
    });

    server.configure('production', function(){
      server.use(log4js.connectLogger(log, { level: log4js.levels.WARN }));
      log.setLevel('INFO');
      log.info("Start production mode.");
      conn+="Catalyde";
      /* NODE_ENV=production node main.js */
    });
    
    sessionStore = new mongoStore({url: conn},function(){
                     log.info("Initilized session with connect-mongodb and passport")
    });
    
    server.configure(function(){
    	
    	server.set('views', __dirname + "/../client/views");
       	server.set ('view engine', 'jade');
        server.use(express.bodyParser());
        server.use(express.methodOverride()); 
        server.use(express.cookieParser());     
        server.use(express.session(
        	{
        		store: sessionStore,
        	    cookie: { maxAge : 60*1000*15}, // 15 minutes, in milliseconds
        		secret: conf.secret
        	}
        	));
        
        server.use(passport.initialize());
        server.use(passport.session());
        			 
        //server.router is last setup we must initialize if not the app crash
        server.use(server.router);	
        server.use(express.favicon(__dirname + '/../client/img/favicon.png'));	
        server.use(express.static(__dirname + '/../client'));
    });

    /*server.configure(function() {
            server.use(log4js.connectLogger(log, { level: log4js.levels.INFO }));
    });*/
    


	var routes = require('./routes.js')(server);
	db = new DB.startup(conn);
	workspace.init();
	
        

    var io = sockeio.listen(server, { 'log level': 0 })
    

    io.configure(function () {
        io.set('transports', ['flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
        io.set('authorization',function(req,res)
        {
        	if(req.headers.cookie)
        	{

        		req.cookie=parseCookie(req.headers.cookie);
        		req.sessionID=req.cookie['connect.sid'];
        	
        		if(true)
        		{
	        		sessionStore.get(req.sessionID,function(err,session)
	        		{
	        			if(err || !session)
	        			{
	        				
	        				res('Error',false);
	        			}
	        			else
	        			{
	        				req.session= session;
	        				res(null,true);
	        				
	        			}
	        			
	        			
	        		});
        		}
        	}
        	else
        	{
        		return res('No cookie',false);
        	}
        })
    });

    server.listen(port, host, function() {
        
            // if run as root, downgrade to the owner of this file
           
            if (process.getuid() === 0) {
                if(downgrade == true){
                    require('fs').stat(__filename, function(err, stats) {;
                    if (err) return log.error(err)
                    process.setuid(stats.uid);
                    });
                }
            }
    });
    
    var serverErrorHandler = function(err) {
        if (err.code == 'EADDRINUSE') {
            log.warn('Error: Address already in use. Try running Catalyde under a different port.')
            process.exit(-1)
        }
    }
    

    server.on('error', serverErrorHandler);

    var catalydeUrl;

    if (typeof(host) !== 'undefined') {
        if (port == 80) {
            catalydeUrl = "http://" + host;
        }
        else if (port == 443) { 
        	catalydeUrl = "https://" + host;
        }
        else {
            catalydeUrl =  http_server+host+":" + port;
        }
    } else {
        if (port == 80) {
            catalydeUrl = "http://localhost";
        }
        else if (port == 443) { 
        	catalydeUrl = "https://localhost";
        
        } else {
            catalydeUrl = http_server+"localhost:" + port;
        }
    }

    log.info("Catalyde running at " + catalydeUrl);
    
    if (launchBrowser) {
        var browser;
        switch (process.platform) {
          case "win32": browser = "start"; break;
          case "darwin": browser = "open"; break;
          default: browser = "xdg-open"; break;
        }
        // if this fails, it'll just exit with a non-zero code.
        child_process.spawn(browser, [catalydeUrl]);
    }
    io.of('/admin').on('connection', function(socket)
    {        
        /*admin*/
        var session = socket.handshake.session;
        var userid= session.currentUser;
        var usertype= session.currentUserType;

       if(usertype == "admin")
       {
            socket.on('get-all-users', function() {
               workspace.getAllUsers()
               .on('success', function(users) {
                    socket.emit('users', users)
                })
            })
            socket.on('get-all-practices', function() {
               workspace.getAllPracs()
               .on('success', function(pracs) {
                    socket.emit('pracs', pracs)
                })
            })
            socket.on('get-all-groups', function(who) {
               workspace.getAllGroups()
               .on('success', function(groups) {
                    socket.emit('groups-list', {who: who.id, groups: groups})
                })
            })
            socket.on('user-groups', function(data) {
               workspace.listGroups(data.userid)
               .on('success', function(groups) {
                    socket.emit('user-groups-list', groups)
                })
            })
            
            socket.on('add-group-to-user', function(data) {
               workspace.addGroupToUser(data.user,data.group)
               .on('success', function(data) {
                   
                    socket.emit('adding-group-to-user', {err: null, message: data.message})
                })
               .on('error', function(data) {
                   
                    socket.emit('adding-group-to-user', {err: data.err, message: data.message})
                })
            })
            
            socket.on('groups-pracs', function(data) {
               workspace.getPracsGroupList(data.group)
               .on('success', function(pracs) {
                   
                    socket.emit('groups-pracs-list', pracs)
                })
            })
            
           socket.on('add-practice-to-group', function(data) {
               workspace.addPracsToGroup(data.group,data.practice)
               .on('success', function(data) {
                   
                    socket.emit('adding-practice-to-group', {err: null, message: data.message})
                })
               .on('error', function(data) {
                   
                    socket.emit('adding-practice-to-group', {err: data.err, message: data.message})
                })
            })
        
        }
        else
        {
            log.warn("User "+ userid + " of type: "+usertype+" not allowed to enter" )
            
        }
        
    });
    
    
    /**terminal socket*/
    /*io.of('/terminal').on('connection', function(socket)
    {

    })*/
   /********************/
    
    
    io.sockets.on('connection', function(socket) {
    	//load practices first you have to check if user file exists
    	var session = socket.handshake.session;
    	var userid= session.currentUser;
 	
    	  
        socket.on('init', function() {
            
            workspace.initUserWorkspace(userid);
            //workspace.createUserFolder(userid);
        })
        
        socket.on('exit', function() {
            log.info("Exit request by "+ userid)
            workspace.cleanUserFolder(userid)
            .on("success", function(data){
                log.info("sending confirmation to exit for user "+ userid)
                socket.emit("exit-confirmation",null);
                
            })
            .on("error", function(data){
                log.info("sending confirmation to exit for user "+ userid);
                socket.emit("exit-confirmation",null);
                
            })
        })
                
        socket.on('list', function(groupid) {
        	if(groupid)
        	{
	            workspace.list(groupid)
	            .on('success', function(pList) {
	            	socket.emit('list',{pl: pList})
	            });
           }
        })
        
       socket.on('list-practice', function(group) {
            if(group)
            {
                workspace.listPractice(group)
                .on('success', function(pList) {
                    socket.emit('practice-listed',{pl: pList,groupid: group.id})
                });
           }
        })
        
        
        socket.on('listgroups', function() {
             workspace.listGroups(userid)
            .on('success', function(data) {
                    socket.emit('listgroups', {err: null, data: data})
             })
            .on('error', function(err){
                    socket.emit('listgroups', {err: 'Couldn\'t list the groups', data:  null})
             })
        })
        
        socket.on('save-block', function(block){
            log.debug("request to save block" + block.id);
            workspace.saveblock(userid,block)
            .on('error',function(data)
            {
                
                socket.emit('saving-block',data)
                
            })

        })
        
        socket.on('load', function(group) {
           workspace.load(group,userid).on('success', function(practices) {
                socket.emit('practice', { p: practices, error: null  })
            })
            .on('error', function(err) {
                socket.emit('practice', { p: practices, error: err})
            })
           
        })
        
        socket.on('compile', function(data) {
           workspace.compile(data,userid,routes).on('success', function(practices) {
                socket.emit('compiled', { res: result, error: null  })
            })
            .on('error', function(err) {
                socket.emit('practice', { p: practices, error: err})
            })
           
        })
        
        socket.on('gen-code', function(data) {
           workspace.buildCode(userid,data.pid,data.tag);
           
        })
        socket.on('save-config', function(data) {
           workspace.saveConfig(userid,data.pid,data.tag,data.value);
           
        })
        socket.on('get-config', function(data) {
           workspace.getConfig(userid,data.pid)
           .on('success', function(conf) {
                socket.emit('userconfig', { conf: conf,pid: data.pid })
            })
        })
        

         socket.on('save', function(data) {
           workspace.save(data.path, data.content)
            .on('success', function(file) {
                socket.emit('save-success', { path: data.path })
            })
            .on('error', function(err) {
                socket.emit('save-error', { path: data.path, error: err })
            })
        })
        
        socket.on("action", function(data)
        {
            workspace.executeAction(userid,data,routes)
            .on('success',function(feedback)
            {
                
                socket.emit("compilation-ok",feedback);
                
            })
            .on('error',function(feedback)
            {
                
                 socket.emit("compilation-err",feedback);
                
            })
  
        })  
        
        socket.on("prepare-execution", function() {
            conn = workspace.getProcess(userid);
            conn.gdb_kill();

        

        })

        socket.on("open-terminal", function()
        {
                log.info("open-terminal")
                socket.emit("info", "Connection established. ");    
        })           
                     
        //userid se usa para diferenciar entre usuarios
        socket.on('run', function() {
            console.log("RUUUUUUUUUUUUUUUUNING");
            workspace.run(userid)
            .on("success",function(info){
                socket.emit("info", info); //data{Running Process, Failed}
            })
            .on("print",function(data)
            {
                log.debug("Send printing:"+ data.toString());
                socket.emit("stdout-print", data.toString());
            })
            .on("exit",function(code)
            {
                 log.debug("send exit:"+ code);
                 socket.emit('exit', code);
                 
            });
            
            socket.on('kill', function(data) {
                conn = workspace.getProcess(userid)

                    if(conn == null)
                        return;
                        
                    conn.gdb_end();
                    socket.emit("info", "Program killed");
            });    
        }); 
            
        socket.on('input', function(data){
            userExec = workspace.getProcess(userid)
            if(userExec == null)
            {
                  socket.emit("info","The process is not running.");
                  return;
            }
                    
            log.debug("Input received:",data);
            userExec.execSocket.write(data.toString()+"\n");

        });
        
        socket.on('losefocus', function(data){
            log.debug("focus losed:",data);
        });
        
        socket.on('recoverfocus', function(data){
            log.debug("focus recovered:",data);
        });
        

    })

	}
