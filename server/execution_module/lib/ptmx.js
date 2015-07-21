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
var path = require("path");

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
    this.slavefd    = pts["slavefd"];
    console.log("this.slavefd "+this.slavefd)
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
    this.gdb_end         = gdb_end;
    this.gdb_kill        = gdb_kill;
    this.program_signal  = "UNKNOWN";
    console.log("Fin");

}


function gdb_parseoutput (data,gdbEE,program_signal) {
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
            self.program_signal = "KILLED";
            gdbEE.emit("exit","KILLED");

        }
        if (sdata.indexOf("exited normally") != -1){
            //GOOD End

            self.program_signal = "SUCCESFUL";
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

//    console.log("RUNNING: "+this.running);
    if (!this.gdb_running())
        return;
    
    this.gdb.stdin.write("r\n");
   

    

}

function gdb_quit() {

    if (!this.gdb_running())
        return;

    var r = this.gdb.stdin.write("q\n");
    this.gdb.stdin.end();
 //   console.log("RETORNO WRITE GDB: " +r)


}

function gdb_end() {
   // self.gdb_kill();
   self.gdb.kill("SIGINT");

  // self.gdb.stdin.write("q\n");
  // self.gdb.stdout.write("y\n");
}

function gdb_kill(signal) {

    //TODO
    if(self.gdb_running())
    {
        console.log("KILLING GDB PROGRAM");
        self.gdb.kill("SIGINT");
    }

}

function launch_program(prog) {

    command = "gdb";

    //  args = ["-q","-nw","-i", "mi", "-tty", this.slavedevice,"--batch", "-x", "runner", prog];
    var prog = path.resolve(prog);
    var the_cwd = path.dirname(prog);
    console.log("prog: " + prog + "\nthe_cwd: " + the_cwd);
    args = ["-q","-nw","-tty", this.slavedevice, prog];

    console.log("GDB " + self.gdb);
    console.log("ARGS:  "+args + ", STATE: "+ self.running.toString());
    console.log("SELF: "+self.toString());
    if (self.running) {
        //TODO: The program is running 
        self.gdb_end();
        
    }

    ptmx.flush_ptmx(self.slavefd);

    self.gdb = spawn(command, args,{cwd: the_cwd});
    self.running = true;
    console.log("GDB RUNNING: "+ this.running);
    self.program_signal = "RUNNING";
    self.execSocket.resume();
    //TODO: Hacer Pipe a GdbSocket
    
    console.log("GDB 2" + self.gdb);
    _gdbEE = this.gdbEE;
    this.gdb.on('exit', function(signal) {
        _gdbEE.emit('gdb_exit',signal);
        console.log("GDB finished:" + signal);
       self.running = false; 
    });

    this.gdb.stdout.on('data', function(data) {
      
    _program_signal = this.program_signal;

    gdb_parseoutput(data,_gdbEE);});
  

}
Execution.info = info;


/**
 * Events
 */

function launch_program_batch(prog) {
  
    console.log("LANZANDO PROGRAMA: "+ prog)
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
