var execFile = require('child_process').execFile;
var compile = function(clientid,args,callbackError,callbackOK) {
    var compiler = "clang"
    var child    = execFile(compiler,args,function(err, stdout, stderr) {
	//console.log("Compilando \""+sourcecode+"\" para generar \""+binary+"\"\n")
        if (err)
	    callbackError(clientid,stderr);
        else
	    callbackOK(clientid,stdout);
    });
};
var compilationSuccessful = function(clientid,stdout) {
    console.log("Program of user " + clientid + " compiled succesfully");
}
var compilationError = function(clientid,stderr) {
    console.log("Program of user " + clientid + " compilation error:\n" + stderr);
}
compile("marcos",["-o","mal","prova_mal.c"],compilationError,compilationSuccessful);
compile("ximo",["-o","bien","prova_bien.c"],compilationError,compilationSuccessful);

