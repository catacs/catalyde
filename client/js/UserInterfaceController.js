var UserInterfaceController = function() {
    var _this = this;

    var searchResultHtmlElementByPath
    var fileHtmlElementByPath = {}
    var htmlElementByPathTable = {};
    var stateByPath = {}
    var practiceList = {}
    var openedPractices = [];
    var contador=0;
    
    //for security saving practices every 5 minutes
    window.setInterval(function() {
        saveAllTabs();
    }, 300000);


    document.addEventListener("fullscreenchange", function () { contador++; }, false);
    document.addEventListener("mozfullscreenchange", function () {
	// if (not document.mozFullScreen)
	//     alert("Has dejado pantalla completa!");
    }, false);
    document.addEventListener("webkitfullscreenchange", function () {
	// if (not document.webkitIsFullScreen)
	//     alert("Has dejado pantalla completa!");
    }, false);
    
    
    connection.init()
    
    $("#tabs-pan").tabs({
        fxAutoHeight: true,
        closable : true,
        closableClick : function(event, ui) {
            
            //var selected = //$("#tabs-pan").tabs("option", "selected");
           // $("#status-bar").text(" Closed file: " + openedPractices[selected].title);
            openedPractices.splice(ui.index, 1);
            var size = $("#tabs-pan").tabs("length");
            if (size == 1) {
                $("#tabs-pan").css({
                    visibility : 'hidden',
                    zIndex : -1
                })
            }

            return true;
        }
    }).find(".ui-tabs-nav").sortable({
        axis : "x"
    });

    /* efecto */
    $('#tabs-pan').bind('tabsadd', function(event, ui) {
    	if ($('#tabs-pan >ul >li').size() == 1) {
    	    $(".contentdrop-shadow").css({visibility: "visible"});
	}
    });
    $('#tabs-pan').bind('tabsremove', function(event, ui) {
    	if ($('#tabs-pan >ul >li').size() == 0) {
    	    $(".contentdrop-shadow").css({visibility: "hidden"});
    	}
    });

    $(function() {
        $.extend($.fn.disableTextSelect = function() {
            return this.each(function() {
                if ($.browser.mozilla) {//Firefox
                    $(this).css('MozUserSelect', 'none');
                } else if ($.browser.msie) {//IE
                    $(this).bind('selectstart', function() {
                        return false;
                    });
                } else {//Opera, etc.
                    $(this).mousedown(function() {
                        return false;
                    });
                }
            });
        });
        $('.noSelect').disableTextSelect();
        //No text selection on elements with a class of 'noSelect'
    });
    
    
    $('#save').click(function() {
        var selected = $("#tabs-pan").tabs("option", "selected");
        if (selected < 0)
        {
            _this.showMessage({
                message : "Ninguna práctica abierta"
            });
        }
        else
        {
            saveCurrentTab("tab-" + openedPractices[selected]._id);
            _this.showMessage({
                message : "Guardando la práctica"
            });
        }
    })
    
    $('#save-all').click(function() {
        if(openedPractices.length == 0)
        {
            _this.showMessage({
                message : "Ninguna practica abierta"
            });
        }
        else
        {
             saveAllTabs();
            _this.showMessage({
                message : "Guardando todas las prácticas"
            });
        }
    })
    $('#user-name').click(function() {
        _this.showMessage({message: "User configs"})
        
    })
    $('#signout').click(function() {
        saveAllTabs();
        connection.exit();
        
    })
    
    $('#about').click(function() {
        _this.showMessage({message:"Catalin Costin Stanciu \
                              Copyright © 2012 All Rights Reserved."})
    })

    $('#setfullscreen').click(function() {

	$(window).bind("resize", function(){
	    var w = $(window).width();
	    var h = $(window).height();
	    
	    $("#mycanvas").css("width", w + "px");
	    $("#mycanvas").css("height", h + "px"); 
	});


	function fullScreen() {
	    var el = document.documentElement
	    , rfs = // for newer Webkit and Firefox
            el.requestFullScreen
		|| el.webkitRequestFullScreen
		|| el.mozRequestFullScreen
		|| el.msRequestFullScreen
	    ;
	    if(typeof rfs!="undefined" && rfs){
		rfs.call(el);
	    } else if(typeof window.ActiveXObject!="undefined"){
		// for Internet Explorer
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript!=null) {
		    wscript.SendKeys("{F11}");
		}
	    }
	}
	fullScreen();
	// var docElm = document.documentElement;
	// if (docElm.requestFullscreen) {
	//     docElm.requestFullscreen();
	// }
	// else if (docElm.mozRequestFullScreen) {
	//     docElm.mozRequestFullScreen();
	// }
	// else if (docElm.webkitRequestFullScreen) {
	//     docElm.webkitRequestFullScreen();
	// }
    })
    
    $('#print').click(function() {
        saveAllTabs();
        var tab = getCurrentTab();
        if (tab)
        {
            $('#' + tab + ' iframe').get(0).contentWindow.print();
        }
        else
        {
            _this.showMessage({
                message : "Ninguna práctica seleccionada"
            })
        }
    })

    this.exit =  function()
    {
        window.location = "/logout";
    }
    
    this.checkChanged = function(checkbutton) {
      var id = getCurrentPracticeId();
      if (id) {
        connection.saveConfig({
          pid : id,
          tag : checkbutton.getAttribute("value"),
          value : checkbutton.checked
        })
	checkbutton.previousSibling.innerHTML = (checkbutton.checked ? "Código activado" : "Código desactivado")
      } else
            _this.showMessage({
                message : "Ninguna práctica seleccionada"
            })
    }
    
    this.initExecutionHandler =  function(handler)
    {
        var actualHandler = handler ||  'terminal';
        
        switch(actualHandler)
        {
            case 'terminal':
                             _this.openTerminal()
            break
            default:
                    _this.openTerminal()
                
        }
        
    }
    
    this.openTerminal =  function()
    {

        // Check if is any program running
        connection.prepareExecution();
                var closeTermDialog = function (){
                    $("#terminal:ui-dialog").dialog("destroy");


                };
                  //$('#loading').dialog("destroy");
                _this.hideLoading();
                connection.openterminal();
                termOpen(closeTermDialog, connection);
                        
                $("#terminal:ui-dialog").dialog("destroy");
                $("#terminal").dialog({
                    width : 'auto',
                    resizable : false,
                    modal : true,
                    close: function(event, ui)
                    {
                        kill_program()
                        termClose();
                    }
                });
                launch_program(); 
        
    }
    this.showCompilationErrors= function(err)
    {
               //$('#loading').dialog("destroy");
               _this.hideLoading();
               _this.showMessage({message: "Error de compilacion: \n\n"+err, width: '600'}) 
    }
    this.showCompilationOk= function(out)
    {
               //$('#loading').dialog("destroy");
               _this.hideLoading();
               _this.showMessage({message: "Compilacion: "+out}) 
    }
        
    this.showLoading = function()
    {           
       $('#loading').removeClass("invisible");
       $('#loading').addClass("visible");
    }
    
    this.hideLoading = function()
    {
       $('#loading').removeClass("visible");
       $('#loading').addClass("invisible");
 
    }

    this.hitButton = function(button) {
         //saveCurrentTab();
        _this.showLoading();
        /*setTimeout(function(){
            _this.hideLoading()
            _this.showMessage({message: "Time waiting exceded: Button action not available."})    
        },30000);*/
        var selected = $("#tabs-pan").tabs("option", "selected");
        var currentPractice = openedPractices[selected]._id;
	    // a discutir: salvamos la practica antes de cualquier accion:
	    saveCurrentTab("tab-" + openedPractices[selected]._id);
	    // WARNING: esto esta mal, nada garantiza que el salvado anterior termine antes de que se ejecute
	    // la accion, hay que usar mecanismos adecuados
        connection.runAction({action : button.getAttribute("data-action"), pid : currentPractice, tag : button.getAttribute("data-tag") });
              
    }
    saveAllTabs = function() {
        for (var op in openedPractices) {
            saveCurrentTab("tab-" + openedPractices[op]._id);

        }

    }
    getCurrentTab = function() {
        var selected = $("#tabs-pan").tabs("option", "selected");
        if (selected < 0)    
            return null;
        else
            return "tab-" + openedPractices[selected]._id;

    }
    getCurrentPracticeId = function() {
        var selected = $("#tabs-pan").tabs("option", "selected");
        if (selected < 0)
            return null;
        else
            return openedPractices[selected]._id;

    }
    saveCurrentTab = function(tab) {
        var blocks = $('#' + tab + ' iframe').contents().find('body #blocks .editable');
        var mirrors = $('#' + tab + ' iframe').get(0).contentWindow.mycodemirror;
        var content;
        var id;
        //saving the content from Codemirror to textarea
        for (var c in mirrors) 
        {
            mirrors[c].save();
        }

        for (var b in blocks) {
            var children = blocks[b].childNodes;
            for (var j in children) {
                // get the textarea with the content
                if (children[j].tagName == "TEXTAREA") {
                    id = children[j].id;
                    content = children[j].value;
                    //emitir el salvado
                    connection.saveblock({
                        id : id,
                        content : content
                    });
                }
            }

        }

    }

    $('#project-refresh').click(function(e) {
        connection.listgroups();
    })
    
    var shouldDismissGearMenuOnMouseUp = false;

    var hasJustDisplayedGearMenu = false;

    this.showMessage = function(data) {
        $("#inform-popup").empty();
        $("#inform-popup").append(data.message);
        $("#inform-popup").dialog({
            resizable : false,
            width:  data.width || 300,
            height : data.height || 'auto',
            modal : true,
            buttons : {
                "Ok" : function() {
                    $(this).dialog("destroy");
                }
            }
        })

    }

    this.updateFileListing = function(data) {
        prs = data.pl;
        groupid = data.groupid;
        searchResultHtmlElementByPath = {}
        fileHtmlElementByPath = {};

        var ul = document.createElement("ul")

        $('#practice-tree #group-list ul li #' + groupid).empty();

        var plist = $('#' + groupid).append(ul).find('ul');
        for (var prac in prs) {
            entry = prs[prac];
            entry.type = "practice"
            var thisElement = document.createElement("li");
            thisElement.id = prs[prac]._id;
            thisElement.className = 'practice';
            
            htmlElementByPathTable[entry._id] = thisElement;
            practiceList[entry._id] = entry;
            thisElement.innerHTML = '<img src="img/file.png">' + entry.title;

            $(thisElement).click(function(e) {

                _this.selectPractice(practiceList[this.id], this)

            })

            $(thisElement).dblclick(function(e) {

                _this.openPractice(practiceList[this.id], this);

            })
            plist.append(thisElement);

        }

    }
    

    this.updateGroups = function(data) {
        if (data.err) {
            alert(data.err.toString());
        } else {
            var groups = data.data;

            for (var i = 0; i < groups.length; i++) {
                $('#group-list').append('<li id="' + groups[i]._id + '">' + "<div class='accordeon'>" +groups[i].description + '</div></li>');
                connection.listPractice(groups[i]._id);
            }
        }
        
        $('.accordeon').click( function(){ 
                       $(this).next().toggle('slow');
                       return false;
                     }).next().hide()

    }

    this.updateUserConf = function(data) {
        var conf = data.conf;
      if (conf != undefined) {
        var tab = "tab-" + data.pid;
        if (tab) {
          var checkButtons = $('#' + tab + ' iframe').contents().find('body #blocks .code-checkbutton');
          for (var i = 0; i < checkButtons.length; i++) {
	    console.log(checkButtons[i].id + " value vale " + conf[checkButtons[i].getAttribute("value")])
            checkButtons[i].checked = (conf[checkButtons[i].getAttribute("value")] != undefined) && 
	      conf[checkButtons[i].getAttribute("value")];
	    var mensaje = (checkButtons[i].checked) ? "Código activado" : "Código desactivado";
	    $('#' + tab + ' iframe').contents().find("body #blocks label[for='"+checkButtons[i].id+"']").text(mensaje)
          }
        }
      }
    }
    
    var editorPool = new EditorPool();

    $("#tabs-pan > ul").tabs({
        select : function(event, ui) {
            window.location = "#" + ui.tab;
        }
    });

    var setCurrentEditor = function(editor, entry) {
        name = entry.title || 'new tab';
        if ($.inArray(entry, openedPractices) >= 0) {
            var index = openedPractices.indexOf(entry);
            $("#tabs-pan").tabs("select", "tab-" + entry._id);
            _this.showMessage({message: "Práctica ya abierta."})
	    return;
        } else {

            openedPractices.push(entry);

            $("#tabs-pan").css({
                visibility : 'visible',
                zIndex : 1
            });
            $("#tabs-pan").tabs("add", "#tab-" + entry._id, name);

            var size = $("#tabs-pan").tabs("length");

            $("#tabs-pan").tabs("select", "tab-" + entry._id);
            $("#tab-" + entry._id).append(editor);
            $("#tab-" + entry._id).addClass("practice-viewer");
            $("#tabs-pan li ").addClass("noSelect");

        }
    }

    this.selectPractice = function(entry, htmlElement) {
        
        $('.selected').removeClass('selected')
        currentPractice = entry
        $(htmlElement).addClass('selected')

    }

    this.openPractice = function(entry, htmlElement) {
        
        opened = openedPractices[htmlElement.id];
        $('.selected').removeClass('selected')
        currentPractice = entry
        $(htmlElement).addClass('selected')

        var editor = editorPool.editorForEntry(entry, function(discarted) {
            $(discarted).remove()
        })
        
        setCurrentEditor(editor, entry)
        

    }
    /*  window.onbeforeunload = function(){
    alert('someArgument');
    }*/

    //window.onbeforeunload = check;
    function check() {
        saveAllTabs();
        return false;
        //or put whatever function you need to call when a user closes the web //browser.
    }

    var nowStr = function() {
	var now = new Date();
	var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
	return strDateTime;
    }

    // // mal rollo no va bien
    // window.onblur = function() {
    // 	console.log("dejas el foco");
    // 	connection.loseFocus(nowStr());
    // };
    // window.onfocus = function(){
    // 	console.log("recuperas el foco");
    // 	connection.recoverFocus(nowStr());
    // };

    
    $(".contentdrop-shadow").css({visibility: "hidden"});


}
