/**
 * pty.js test
 */


var program = require('commander');
var assert  = require('assert');
var ptmx    = require('../');
var net     = require('net');
var spawn   = require('child_process').spawn
//Args
//
program
       .version('0.0.1')
       .option('--prog <program>', 'executable to be launched')
       .parse(process.argv)
    
// Simulates the workspace.js in catalyde    
var prog =  program.prog;

if (prog == undefined)
    return;

ptmx.hello_world();

pts      = ptmx.create_ptmx();
tty      = pts["slavedevice"];
masterfd = pts["masterfd"];


// This is going to ptmx

var red, blue, reset;
red   = '\033[31m';
blue  = '\033[34m';
reset = '\033[0m';

mySocket = net.Socket(masterfd);


mySocket.on('data', function(data) {

    console.log(blue+"PROGRAM: "+data);
});

mySocket.on('error', function(err) {

  console.log(reset+"Error from main program: " +err);
});


command_string = "gdb -q -nw -tty "+ tty +" "+program;

command = "gdb";

//args = ["-q", "-nw", "-tty", tty,"--batch", "-x", "runner", prog];
args = ["-q", "-nw", "-tty", tty,"--batch", "-x", "runner2", prog];
gdb  = spawn(command,args);

mySocket.resume();


gdb.stdout.on('data', function(data) {
    console.log(red+"GDB: "+data);

});

gdb.on("exit", function(code, signal) {
    console.log(reset+"Exit Event", code, signal);

});
