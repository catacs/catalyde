/**
 * ptmx.js test
 * creates a virtual tty (master/slave device)
 * creates a socket on this
 * launch a proces
 */


var program = require('commander');
var assert = require('assert');
var ptmx = require('../');
var net  = require('net')
//Args
//
program
       .version('0.0.1')
       .option('--prog <program>', 'executable to be launched')
       .parse(process.argv)
    
    
var prog =  program.prog;

ptmx.hello_world()

piripi = ptmx.create_ptmx();
tty = piripi["slavedevice"];
console.log(piripi);

mySocket = net.Socket(piripi['masterfd']);
mySocket.setEncoding('utf8');

mySocket.on('data', function(data) {
    console.log("Received data");
    console.log(data);
});

mySocket.on('error', function(err) {

  
});

mySocket.resume();
if (prog == undefined) {
    return;

}


//mySocket = new net.Socket(piripi[
pr = ptmx.launch_gdb_process({"program" : prog, "tty": tty});


pr.on("exit", function(code, signal) {
  console.log("Exit Event", code, signal);

});
