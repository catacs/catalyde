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
    

var exec = ptmx.exec();

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

var gdbEE = exec.gdbEE;

gdbEE.on('exit',function (msg) {
  console.log("msg: "+msg);
  //Launch another program

});

gdbEE.on('gdb_exit', function(signal) {
  
  
  exec.launch_program_batch(prog);

  sSocket.write('10\n');
});
sSocket.write('10\n');
exec.launch_program_batch(prog);
