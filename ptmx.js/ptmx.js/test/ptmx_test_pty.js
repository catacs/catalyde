/**
 * pty.js test
 */


var program = require('commander');
var assert = require('assert');
var ptmx = require('../');

//Args
//
program
       .version('0.0.1')
       .option('--tty <tty_slave>', 'tty to launch the process')
       .option('--prog <program>', 'executable to be launched')
       .parse(process.argv)
    
    
var tty = program.tty;
var prog =  program.prog;

console.log(tty);



ptmx.hello_world();

if (tty == undefined) {
    piripi = ptmx.create_ptmx();
    tty = piripi["slavedevice"];
    console.log(piripi);
}

if (prog == undefined)
    return;

ptmx.launch_gdb_process({"program" : prog, "tty": tty});
