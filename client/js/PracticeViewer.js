
var practiceIframe

var PracticeViewer = function(entry,protocol,hostname,port) {
	
	protocol = protocol || "https:"; 
	hostname = hostname || "localhost";
	port = port || 8123;
	
   var editor = document.createElement('div')
    editor.className = 'practice-viewer'
        practiceIframe = document.createElement('iframe')
        practiceIframe.src = protocol+"//"+hostname+":"+port+"/practice/" + entry._id
        practiceIframe.id = entry._id
        practiceIframe.onload = "window.parent.connection.initCheckButtons(this);"

    editor.appendChild(practiceIframe)
    return practiceIframe
    
}