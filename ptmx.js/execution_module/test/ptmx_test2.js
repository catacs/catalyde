/**
 * pty.js test
 */


var program = require('commander');
var assert = require('assert');
var ptmx = require('../');
var net =  require('net')
var spawn = require('child_process').spawn;
var fs = require('fs');
//Args
//
program
       .version('0.0.1')
       .option('--tty <tty_slave>', 'tty to launch the process')
       .option('--prog <program>', 'executable to be launched')
       .parse(process.argv)
    
    
var slave_name = program.tty;
var prog =  program.prog;

if (prog == undefined)
    return;

ptmx.hello_world();
/*
piripi = ptmx.create_ptmx();
fdmaster = piripi['masterfd'];
slave_name = piripi["slavedevice"];
console.log(piripi);
*/


fdslave = fs.openSync(slave_name, "r+") ;
console.log("slavedevice", slave_name, "fdslave", fdslave);


var mySocket = net.Socket(fdslave);

mySocket.on('data', function(data) {

    console.log('Data found:', data);
});


//pr = spawn(prog, [], {stdio:['ignore', fdslave, fdslave]});

pr = spawn(prog, [], [process.stdin,'pipe','pipe']);
//pr.stdin.resume();
pr.stdout.pipe(mySocket, {end:true});
pr.stdin.pipe(mySocket, {end:true});
pr.on("exit", function(code, signal){
    console.log("End process", code, signal);
});

