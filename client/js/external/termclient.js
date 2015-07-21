var term;
var socket; 

function termOpen(OnExitHandler, connect) {

    if (OnExitHandler == null) 
        OnExitHandler = termExitHandler;
    
    if (!term) {

        socket = connect.getSocket();

        socket.on('print',function(data){


            pdata = ("%c(green)"+data).split("\n");
            term.write(pdata);
            term.prompt();
            console.log('escribe "'+pdata+'"');

        })

        socket.on('stdout-print',function(data){
            term.lock=true;

            pdata = ("%c(white)"+data);
            //       if (term.c>0) term.newLine();

            term.write(pdata);

            if (term.c>0)
            term._charOut(1);

        term.lock=false;

        term.cursorOn();
        })

        socket.on('no_process',function(e){
            //TODO: Handle the message
            pdata = "%c(red)Program executing: "+e;
            term.write(pdata);
            term.prompt();


        })

        socket.on('info',function(e){
            //TODO: Handle the message
            console.log("#TERMLIB INFO: " +e);
            //	  	pdata = "%c(darkyellow)"+e;
            //	  	term.write(pdata);
            //	  	term.prompt();


        })

        socket.on('exit',function(e){
            //TODO: Handle the message
            if (e == "KILLED")
            e = "El programa ha terminado con error"
            else if (e == "SUCCESFUL")
            e = "El programa ha terminado satisfactoriamente"
            else e  = "El programa ha terminado con: " + e
            pdata = "%c(red)"+ e+"\nPulsa ESC para salir...";
        term.write(pdata);
        //term.prompt();
        term.lock = true;
        term.finished = true;
        //this.close();

        })

    }
    if ((!term) || (term.closed)) {
        term = new Terminal(
                {
                    x: 0,
            y: 0,
            termDiv: 'terminal',
            bgColor: '#111111',
            greeting: '',
            // greeting: 'Ejecutando el ejercicio.... ',
            handler: termHandler,
            exitHandler: OnExitHandler,
            ps: ""
                }
                );
        term.open();
        // Ejecutando el ejercicio....dimm UI text
        var mainPane = (document.getElementById)?
            document.getElementById('mainPane') : document.all.mainPane;
        if (mainPane) mainPane.className = 'lh15 dimmed';

    }
}

function termClose() {
    if(term)
        term.close();
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
                    this.write("%c(red) No conection too server!");

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

    //close the container
    //

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

//var socket = null;

//socket = io.connect(window.location.origin, {'connect timeout': 25000});


function launch_program(){

    socket.emit('run')
    term.finished = false;
}


function kill_program(){

    
    if (socket == null){
        term.write("%c(red) No conection to server!");
        term.prompt();
        return;
    }

     if (!term.finished)
       socket.emit('kill',"");
}

function compile(){
    if (socket == null){
        term.write("%c(red)  No conection to server!");
        term.prompt();
        return;
    }

    socket.emit('compile',"");

}



