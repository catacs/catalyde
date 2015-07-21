var ServerConnection = function() {
    
    _this =  this;
    if (!window.location.origin) 
        window.location.origin = window.location.protocol+"//"+window.location.host;

    var socket = io.connect(window.location.origin, {'connect timeout': 25000});
  
    socket.on('welcome', function() {
      
    })

	socket.on('list', function (data) {
        ui.updateFileListing(data.pl)
    });
    socket.on('exit-confirmation', function (data) {
        ui.exit();
    });
    
    socket.on('practice-listed', function (data) {
        ui.updateFileListing(data)
    });
    
    socket.on('listgroups', function (data) {
        ui.updateGroups(data);
    });
    
    socket.on('userconfig', function (data) {
        ui.updateUserConf(data);
    });
    socket.on('open-terminal',function(data)
    {
        ui.openTerminal();
        
    })

    var loadFileCallbacks = {}
    this.loadFile = function(path, callback) {
        socket.emit('load', path)
        if (!loadFileCallbacks[path]) {
            loadFileCallbacks[path] = [callback]
        } else {
            loadFileCallbacks[path].push(callback)
        }
    }

    socket.on('practice', function(data) { 
        var callbacks = loadFileCallbacks[data.p] || []
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](data.error, data.file)
        }
        delete loadFileCallbacks[data.path]
    })
    

    var saveFileCallbacks = {}
    this.saveFile = function(path, content, callback) {
        socket.emit('save', {path: path, content: content})
        if (!saveFileCallbacks[path]) {
            saveFileCallbacks[path] = [callback]
        } else {
            saveFileCallbacks[path].push(callback)
        }
    }

    socket.on('save-success', function(data) { 
        var callbacks = saveFileCallbacks[data.path] || []
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](null)
        }
        delete saveFileCallbacks[data.path]
    })
    
    socket.on('save-error', function(data) { 
        var callbacks = saveFileCallbacks[data.path] || []
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](data.error)
        }
        delete saveFileCallbacks[data.path]
    })
    
    socket.on('compilation-ok', function(data) {
            ui.initExecutionHandler(data.handler); 
            //ui.showMessage({message: "Compilación ejecutada con éxito"});
    })
    
    socket.on('running', function(data) { 
            ui.openTerminal();
            //ui.showMessage({message: "Compilación ejecutada con éxito"});
    })
    
        
    socket.on('compilation-err', function(data) { 
             ui.showCompilationErrors(data.error)
    })
    
            
    socket.on('compilation-compiled', function(data) { 
             ui.showCompilationOk(data.out)
    })
    
    
    socket.on('saving-block', function(data) { 
         ui.showMessage(data);
    })
    
    
    this.init = function()
    {
       socket.emit('init', null);
        _this.listgroups();
    }
    this.exit = function()
    {
       socket.emit('exit', null);
    }
    
    this.runAction= function(data)
    {
        socket.emit("action",data);
    }
    
    this.skipWelcome = function() {
        socket.emit('skip-welcome')
    }
    
    this.saveblock = function(block)
    {
       socket.emit('save-block', block)
    }
    //listing the practices in a group
    /*this.list = function(gid) {
        socket.emit('list',{gid: gid})
    }*/
    this.initCheckButtons = function(id)
    {
        socket.emit("get-config",{pid: id});
    }
                
    this.getSocket = function() {

      return socket;
    }

    this.prepareExecution = function() {
        socket.emit('prepare-execution', null);

    } 
    this.listPractice = function(groupid) {
        socket.emit('list-practice',{id: groupid})
    }
    
    this.compile = function(data) {
        socket.emit('compile',data)
    }
    this.openterminal = function() {
        socket.emit('open-terminal',null);
    }
    this.genCode = function(data) {
        socket.emit('gen-code',data);
    }
    this.saveConfig = function(data) {
        socket.emit('save-config',data);
    }
    
    this.listgroups = function() {
        socket.emit('listgroups');
    }

    this.loseFocus = function(data) {
        socket.emit('losefocus',data);
    }

    this.recoverFocus = function(data) {
        socket.emit('recoverfocus',data);
    }
}
