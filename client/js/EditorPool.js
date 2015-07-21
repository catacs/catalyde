(function() {
    //var MAX_EDITORS = 15
    
    var EditorPool = window.EditorPool = function() {
        this.editors = []
    }
    
    EditorPool.prototype.editorForEntry = function(entry, withDiscarted) {
        var editor;
        for (var i=0; i < this.editors.length; i++) {
            if (this.editors[i].id == entry._id &&
                this.editors[i].type == entry.type) {
                // Move editor to the first position in array
                editor = this.editors.splice(i, 1)[0]
                this.editors.splice(0, 0, editor);
                return editor.element;
            }
        } 
        
        editor = {
            type: entry.type,
            id: entry._id
        }
        
        switch(entry.type) {
            case "practice":
                editor.element = new PracticeViewer(entry,window.location.protocol,window.location.hostname, window.location.port)	
            break;
        }
        
        this.editors.splice(0, 0, editor)
        
        /*if (this.editors.length > MAX_EDITORS) {
            var discarted = this.editors.pop()
            if (withDiscarted) {
                withDiscarted(discarted)
            }
        }*/
        
        return editor.element
    }
})()
