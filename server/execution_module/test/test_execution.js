var program = require('commander');
var ptmx = require('../lib/ptmx.js')
var net =  require('net')
var spawn = require('child_process').spawn;
//Args
//
program
       .version('0.0.1')
       .option('--prog <program>', 'executable to be launched')
       .parse(process.argv)
    

exec = ptmx.exec();

var prog =  program.prog;
if (prog == undefined)
    prog = "progs/test3";
 
sSocket = exec.execSocket;
sSocket.on('data', function(data) {
    //Redireccionar el data       
    console.log("PROGRAM: "+data);

});

sSocket.on('error', function(err) {
    console.log("execSocket ERROR: "+err);

});

sSocket.write('10\n');
exec.launch_program(prog);
