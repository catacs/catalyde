var term;
	
	function termOpen() {
		if ((!term) || (term.closed)) {
			term = new Terminal(
				{
					x: 0,
					y: 0,
					termDiv: 'termDiv',
					bgColor: '#232e45',
					greeting: 'Terminal iniciada correctamente ',
					handler: termHandler,
					exitHandler: termExitHandler,
	                                ps: ">"
				}
			);
			term.open();
			
			// dimm UI text
			var mainPane = (document.getElementById)?
				document.getElementById('mainPane') : document.all.mainPane;
			if (mainPane) mainPane.className = 'lh15 dimmed';
		}
	}

	function termHandler() {
		// default handler + exit
		this.newLine();
		<!-- if (this.lineBuffer.search(/^\s*exit\s*$/i) == 0) { -->
		<!-- 	this.close(); -->
		<!-- 	return; -->
		<!-- } -->
		<!-- else if (this.lineBuffer != '') { -->
			if(socket == null){
				term.write("%c(red) No hay conexión con el servidor!");
				
			}
			else{
				senddata = this.lineBuffer +"\n";
				socket.emit('input',senddata);
				
				
			}
		<!-- } -->
		this.prompt();
	}

	function termExitHandler() {
		// reset the UI
		var mainPane = (document.getElementById)?
			document.getElementById('mainPane') : document.all.mainPane;
		if (mainPane) mainPane.className = 'lh15';
	}
	
	
	// demo hooks
	
	
	var useMultiLineImport=false;
	
	function testMultiLine(funcFlag) {
		if ((!term) || (term.closed)) {
			alert('Please open a terminal first!');
			return;
		}
		// set flag for handler
		// if true, we'll use importMultiLineText(), else importEachLine()
		useMultiLineImport=funcFlag;
		
		// set global keylock (else no key stroke will reach the form element)
		TermGlobals.keylock = true;
		
		// and show the multiline prompt
		TermGlobals.setVisible('promptDiv', true);
		document.forms.promptForm.content.focus();
		// input will by handled by promptHandler
	}
	
	function promptHandler(text) {
		// hide the dialog
		TermGlobals.setVisible('promptDiv', false);
		
		// reset keylock and import the text
		TermGlobals.keylock = false;
		if (text) {
			if (useMultiLineImport) {
				TermGlobals.importMultiLine(text);
			}
			else {
				TermGlobals.importEachLine(text);
			}
		}
	}
	
var socket = null;

	socket = io.connect('http://localhost');
	
	socket.on('print',function(data){
	  	
	  	
	  	pdata = ("%c(green)"+data).split("\n")
	  	term.write(pdata);
	  	term.prompt();
	  	console.log(pdata);
	  	
	  })
	  
	  socket.on('no_process',function(e){
	  	    //TODO: Handle the message
	  	pdata = "%c(red) El programa no está ejecutándose: "+e;
	  	term.write(pdata);
	  	term.prompt();
	  	  	
	  	
	  })
	  
	  socket.on('info',function(e){
	  	    //TODO: Handle the message
	  	pdata = "%c(yellow)"+e;
	  	term.write(pdata);
	  	term.prompt();
	  	  	
	  	
	  })
	  
	  socket.on('exit',function(e){
	  	    //TODO: Handle the message
	  	pdata = "%c(red) El programa ha sido finalizado: "+e;
	  	term.write(pdata);
	  	term.prompt();
	  	this.close();
	  	
	  })
	
	function launch_program(){
	  
	   	  socket.emit('run')
	  
	 }
	 
	 
	 function kill_program(){
	 	if (socket == null){
	 		term.write("%c(red) No hay conexión con el servidor!");
	 		term.prompt();
	 		return;
	 	}
	 	socket.emit('kill',"");
	 }
	 
	 function compile(){
	 	if (socket == null){
	 		term.write("%c(red) No hay conexión con el servidor!");
	 		term.prompt();
	 		return;
	 	}
	 	
	 	socket.emit('compile',"");
	 	
	 }
	 

