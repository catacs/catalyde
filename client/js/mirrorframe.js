function MirrorFrame(place, options) {
  
 //   options={lineNumbers: true,mode: "text/x-csrc"};
  this.mirror = new CodeMirror.fromTextArea(place, options); 
  var cn = place.parentNode.children;
  //search the buttons class element
  for(var i =0; i<cn.length;i++)
  {
        if(hasClass(cn[i],"buttons"))
        {
             this.buttonsmenu = cn[i];
             break;
        }
  }
  
  /*this.buttonsmenu = document.createElement("div");
 
  
  if (place.parentNode.insertBefore)
    place.parentNode.insertBefore(this.buttonsmenu,place);
  else
    place.parentNode(this.buttonsmenu);
*/
  var self = this;
  function makeJQueryButton(name,action)
  {
      var button = document.createElement("input");
      button.type = "button";
      button.value = name;
      $(button).button();
      self.buttonsmenu.insertBefore(button,self.buttonsmenu.firstChild);
      button.onclick  = function(){self[action].call(self);};
      
      
      
  }
  

  function hasClass(ele,className) {
        return ele.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
  }
  function makeButton(name, action) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = name;
    self.buttonsmenu.insertBefore(button,self.buttonsmenu.firstChild);
    button.onclick = function(){self[action].call(self);};
    
  }
  function giveStyle() {
    
    var cn = self.buttonsmenu.children;;
    //search the buttons  in buttons menu and give style
      for(var i =0; i<cn.length;i++)
      {
            switch(cn[i].type)
            {
                  case "button":
                                $(cn[i]).button();
                                break;
                  case "checkbox": 
                                //$(cn[i]).button();
                                break;
                  default:
                     
            }
      }
    
  }
  function makeImageButton(name, action) {
    var button = document.createElement("input");
    button.type = "image";
    button.src = "/img/"+action+".png";
    button.value = name;
    self.buttonsmenu.insertBefore(button,self.buttonsmenu.firstChild);
    button.onclick = function(){self[action].call(self);};
  }
    makeButton("Deshacer", "undo");
    makeButton("Rehacer", "redo");
	//makeImageButton("Undo", "undo");
	//makeImageButton("Redo", "redo");
    makeButton("Reindentar", "reindent");
	//$(self.buttonsmenu).buttonset();
	giveStyle();
}

MirrorFrame.prototype = {

  undo: function(){
      this.mirror.undo()
  },

  redo: function(){
      this.mirror.redo()
  },

  reindent: function() {
      // esto ya no va:
      //    this.mirror.reindent();
      // esto si que va:
      // If you just iterate from 0 to editor.lineCount(), and call
      // editor.indentLine(i) for every line, you get the same effect.
      var lcount = this.mirror.lineCount();
      for (i=0; i<lcount ; i++) {
    	  this.mirror.indentLine(i);
      }
  },
  
  save: function() {
    this.mirror.save();
  }
};
