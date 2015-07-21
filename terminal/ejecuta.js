var express = require('express')

var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;
var socketio = require('socket.io')
var pty = require("pty.js")

var PROG = "./hx"
var COMP = "./gcc -o hx "

var server = express.createServer() 
    

server.configure(function(){
    	
    	server.set('views', __dirname + "/html");
       	server.set ('view engine', 'jade');
    	server.set("view options", {layout: false});
    	server.use(express.static(__dirname + '/'));
         
        		 
        //server.router is last setup we must initialize if not the app crash
        
		
        //server.use(express.static(__dirname + '../html'));
        
 });

server.listen(8080);

io = socketio.listen(server)

server.get('/',function(req,res){
	
	res.render("ejecuta.jade");
	
});
	
io.sockets.on('connection', function (socket) {
		//socket.emit("print","hello_world\n")
		
		//var p = execFile(PROG, [],{stdio : ['pipe','pipe','pipe']});
    var p = null;
					
	socket.emit("info", "Establecida conexión");	
	socket.on('run', function() {
		p = pty.fork(PROG, [], {}
			 
		);
		
		
		//setTimeout(function () {
		//	p.kill('SIGHUP');
    		
  		//}, 1000);
		socket.emit("info", "Lanzado Proceso")
		p.stdout.on('data', function(data) {
			console.log('Data!!', data.toString());
			socket.emit("print", data.toString());

		});

		socket.on('kill', function(data) {
			
			if(p == null)
				return;
				
			p.kill('SIGHUP');
			console.log("Program killed")
		});

		
		p.on('exit', function(code) {

			console.log('child process terminated due to receipt of signal ' + code);
			socket.emit('exit', code);
			p = null;
		});

	}); 
		
    socket.on('input', function(data){
    		if (p == null){
    			
    			socket.emit("info","El proceso no se está ejecutando.");
    			return;
    		}
    			
			console.log("Recibido:",data);
			p.stdin.write(data.toString());
			
	});
	
		
	  		
});





