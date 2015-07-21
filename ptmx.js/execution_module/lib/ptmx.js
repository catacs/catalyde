/**
 * ptymx.js
 * Copyright (c) 2012, Joan Pastor, Catalin Stanciu, Salvador España
 * Binding to the pseudo terminals.
 */

var net = require('net');
var ptmx = require('../build/Release/ptmx.node');
var fs = require('fs');
var spawn = require('child_process').spawn;
var EventEmitter = require('events').EventEmitter;

/**
 * Execution
 */
function Execution(args) {
    console.log("Execution "+ this); 
    if (!(this instanceof Execution)) {
        return new Execution(args);
    }

    self = this
    // backward compatibility
    /*if (typeof args === 'string') {
      opt = {
      name: arguments[1],
      cols: arguments[2],
      rows: arguments[3],
      cwd: process.env.HOME
      };
      args = [];
      }

    // arguments
    args = args || [];
    */

    // Create ptmx
    //
    
    var pts = ptmx.create_ptmx();

    //Slave device
    this.slavedevice = pts["slavedevice"];
    this.masterfd    = pts["masterfd"];
    //Create EventEmitter for the process 
    //FixMe: Change for an event emiter
    this.execSocket  = new net.Socket(this.masterfd);
   

    //Event Emitter
    this.gdbEE      = new EventEmitter();
    

    //Program gdb
    this.gdb        = null;
    this.running    = false;

    this.launch_program  = launch_program;
    this.launch_program_batch = launch_program_batch;
    this.gdb_run         = gdb_run;
    this.gdb_quit        = gdb_quit;
    this.gdb_running     = gdb_running;
    this.gdb_parseoutput = gdb_parseoutput;
    console.log("Fin");

}


function gdb_parseoutput (data,gdbEE) {
    //Gdb Output parser
    //
    sdata = data.toString();

    console.log("GDB: "+sdata);
    if (sdata.indexOf("SIGSEGV") != -1) {
        gdbEE.emit("signal","SIGSEGV");
    }

    if (sdata.indexOf("Inferior 1") != -1) {
        //BAD end
        if (sdata.indexOf("will be killed.") != -1) {
            gdbEE.emit("exit","KILLED");

        }
        if (sdata.indexOf("exited normally") != -1){
            //GOOD End

            gdbEE.emit("exit","SUCCESFUL");
        }
    }
}



function gdb_running() {
    //Returns if the program is running
    //
    
    return this.running; 

}


function gdb_run(){


    if (!this.gdb_running())
        return;
    
    this.gdb.stdin.write("r\n");

}

function gdb_quit() {

    if (!this.gdb_running())
        return;

    this.gdb.stdin.write("q\n");

}


function gdb_kill(signal) {

    //TODO
    console.log("KILLING GDB");
    this.gdb.kill("SIGKILL");
    


}

function launch_program(prog) {

    command = "gdb";

    //  args = ["-q","-nw","-i", "mi", "-tty", this.slavedevice,"--batch", "-x", "runner", prog];
    args = ["-q","-nw","-tty", this.slavedevice, prog];

    console.log("AAAAAAAAAAAAAAAAAA "+args);
    
    if (this.gdb != null) {
        //TODO: The program is running 
        //gdb_kill();

    }

    this.gdb = spawn(command, args);
    this.running = true;
    this.execSocket.resume();
    //TODO: Hacer Pipe a GdbSocket

    _gdbEE = this.gdbEE;
    this.gdb.on('exit', function(signal) {
        _gdbEE.emit('gdb_exit',signal);
        console.log("GDB finished:" + signal);
       this.running = false; 
    });

    this.gdb.stdout.on('data', function(data) {
      console.log("PROGRAM:   "+data)
      gdb_parseoutput(data,_gdbEE);});
  

}
Execution.info = info;


/**
 * Events
 */

function launch_program_batch(prog) {
  
    console.log("OJETE");
    this.launch_program(prog);

    this.gdb_run();
    this.gdb_quit();

}


Execution.prototype.destroy = function() {
    //TODO: Close all the sockets/descriptors
};


/**
 * Helpers
 */
function clone(a) {
    var keys = Object.keys(a || {})
        , l = keys.length
        , i = 0
        , b = {};

    for (; i < l; i++) {
        b[keys[i]] = a[keys[i]];
    }

    return b;
}

function environ(env) {
    var keys = Object.keys(env || {})
        , l = keys.length
        , i = 0
        , pairs = [];

    for (; i < l; i++) {
        pairs.push(keys[i] + '=' + env[keys[i]]);
    }

    return pairs;
}


function info() {
    console.log("It works!");

}




Execution.exec = function(args) {
    return new Execution(args);
}
/**
 * Expose
 */
exports = Execution;
//exports.Execution = Execution;
module.exports = exports;
