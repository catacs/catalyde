module.exports = {
    "run" : function(clientid,ojb) {
	obj.copyfile(clientid,filename);
	obj.compile(clientid)
	obj.run(clientid)
    },
    "check" : function(clientid) {
	console.log("check "+clientid);
	return 1;
    }
}

