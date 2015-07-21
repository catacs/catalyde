
$(function() {

            $( ".list" ).selectable();
            $( "#tabs" ).tabs();
            $(".button").button();


var admin = io.connect(window.location.origin, {'connect timeout': 25000});
socket =  admin.of("/admin");

socket.on('users', function(data)
{
    
    updateUserList(data);
});

socket.on('pracs', function(data)
{
    
    updatePracticeList(data);
});

socket.on('groups-list', function(data)
{
    
    updateGroupList(data.who,data.groups);
});

socket.on('user-groups-list', function(data)
{  
    updateUserGroupList(data);
});

socket.on('groups-pracs-list', function(data)
{  
    updateGroupPracticeList(data);
});
socket.on('adding-group-to-user', function(data)
{  
    if(data.err)
    {
            $("#err-message").empty();
            $("#err-message").append(data.message);
            $("#err-message").dialog({
                resizable: false,
                height:400,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
        
    }
    else
    {
            $("#err-message").empty();
            $("#err-message").append(data.message);
            $("#err-message").dialog({
                resizable: false,
                height:400,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
            getUserGroupList();
    }
});
socket.on('groups-pracs-list', function(data)
{  
    updateGroupPracticeList(data);
});


socket.on('adding-practice-to-group', function(data)
{  
    if(data.err)
    {
            $("#err-message").empty();
            $("#err-message").append(data.message);
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
        
    }
    else
    {
            $("#err-message").empty();
            $("#err-message").append(data.message);
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
            getGroupPracticeList();
    }
});

  
     socket.emit("get-all-users",{});
     socket.emit("get-all-groups",{id:"ul-gu"});
     socket.emit("get-all-groups",{id:"ul-groups-list"}); 
     socket.emit("get-all-practices",{}); 



  $('#act-users').click(function() {
      
      socket.emit("get-all-users",{});
       
    })
    
  $('#add-user').click(function() {
      var registerElem  = document.createElement('iframe')
      registerElem.src = window.location.origin+":8123"+"/register/"
      $(registerElem).dialog();
       
    })
    
  $('#act-gu').click(function() {
       socket.emit("get-all-groups",{id:"ul-gu"}); 
    })
  $('#act-ug').click(function() {
       getUserGroupList();
    })


  $('#add-ug').click(function() {
       var userlist = $('#ul-users-list .ui-selected');
       var grouplist  = $('#ul-gu .ui-selected');
       var user = $('#ul-users-list .ui-selected').attr('id');
       var group = $('#ul-gu .ui-selected').attr('id');

       if(user && group)
       {
           if(userlist.length > 1 && grouplist.length >1 )
           {
               $("#err-message").empty();
            $("#err-message").append("Solo debes seleccionar un usuario y un grupo");
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
               
           }
           else if(userlist.length > 1)
           {
               $("#err-message").empty();
            $("#err-message").append("Solo debes seleccionar un usuario");
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
               
           }
           else if(grouplist.length >1)
           {
                $("#err-message").empty();
                $("#err-message").append("Solo debes seleccionar un grupo");
                $("#err-message").dialog({
                    resizable: false,
                    height:200,
                    modal: true,
                    buttons: {
                        "Ok": function() {
                            $( this ).dialog( "close" );
                        }
                    }
            })
           }
           else
           {
                socket.emit("add-group-to-user",{user: user, group: group}); 
           }
       }
       else
       {
            $("#err-message").empty();
            $("#err-message").append("Usuario o grupo no seleccionados");
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
       }
    })
  $('#act-groups').click(function() {
        
       socket.emit("get-all-groups",{id:"ul-groups-list"}); 
    })
  $('#act-pg').click(function() {
        
       socket.emit("get-all-practices",{});
    })
  $('#act-gp').click(function() {
        getGroupPracticeList();

    })
  $('#add-pg').click(function() {
        
       addPracticeToGroup();
    })

var getGroupPracticeList = function()
{
       var grouplist = $('#ul-groups-list .ui-selected')
       var group = $('#ul-groups-list .ui-selected').attr('id');
       if(group)
       {
           if(grouplist.length != 1)
           {
                $("#err-message").empty();
                $("#err-message").append("Solo debes seleccionar un grupo");
                $("#err-message").dialog({
                    resizable: false,
                    height:200,
                    modal: true,
                    buttons: {
                        "Ok": function() {
                            $( this ).dialog( "close" );
                        }
                    }
                })
               
           }
           else
           {
                socket.emit("groups-pracs",{group: group}); 
           }
       }
       else
       {
            $("#err-message").empty();
            $("#err-message").append("Grupo no seleccionado");
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
       }
    
    
}

    
var getUserGroupList  = function()
{
    
       var userlist = $('#ul-users-list .ui-selected');
       var user = $('#ul-users-list .ui-selected').attr('id');
      
       if(user)
       {
           if(userlist.length > 1)
           {
                $("#err-message").empty();
                $("#err-message").append("Solo debes seleccionar un usuario");
                $("#err-message").dialog({
                    resizable: false,
                    height:200,
                    modal: true,
                    buttons: {
                        "Ok": function() {
                            $( this ).dialog( "close" );
                        }
                    }
                })
               
           }
           else
           {
                socket.emit("user-groups",{userid: user}); 
           }
       }
       else
       {
            $("#err-message").empty();
            $("#err-message").append("Usuario no seleccionado");
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
       }
    
}
var updateUserList= function(users)
{
    $("#ul-users-list").selectable( "destroy" )
    $("#ul-users-list").empty();
    
    for(var i in users)
    {
        var li = document.createElement("li");
        li.innerHTML = users[i].name.first + " " + users[i].name.last;
        li.id =  users[i].id;    
       $("#ul-users-list").append(li);

    }
    
    
    $("#ul-users-list").selectable({
        selected: function(event, ui) { 
             var userlist = $('#ul-users-list .ui-selected');
             var user = $('#ul-users-list .ui-selected').attr('id');
             if(userlist.length == 1 && user)
             {
                socket.emit("user-groups",{userid: user});
             }
        }
    });
}    

var updateGroupList = function(who,groups)
{
    $("#"+who).selectable( "destroy" )
    $("#"+who).empty();
    
    for(var i in groups)
    {
        var thisElement = document.createElement("li");
        thisElement.innerHTML = groups[i].description;
        thisElement.id =  groups[i].id;

        $("#"+who).append(thisElement);

    }
    
    
    $("#"+who).selectable({
        selected: function(event, ui) { 
         if(who == "ul-groups-list")  
        {
             var grouplist = $('#ul-groups-list .ui-selected');
             var group = $('#ul-groups-list .ui-selected').attr('id');
             if(grouplist.length == 1 && group)
             {
                socket.emit("groups-pracs",{group: group}); 
             }
        }
        
        
        
     }});
}

var updateUserGroupList= function(groups)
{
    $("#ul-ug-list").selectable( "destroy" )
    $("#ul-ug-list").empty();
    
    for(var i in groups)
    {
        var li = document.createElement("li");
        li.innerHTML = groups[i].description;
        li.id =  groups[i].id;    
        $("#ul-ug-list").append(li);

    }
    
    
    $("#ul-ug-list").selectable();
}      

var updatePracticeList = function(pracs)
{
    $("#ul-pg").selectable( "destroy" )
    $("#ul-pg").empty();
    
    for(var i in pracs)
    {
        var li = document.createElement("li");
        li.innerHTML = pracs[i].title;
        li.id =  pracs[i].id;    
       $("#ul-pg").append(li);

    }
    
    
    $("#ul-pg").selectable();
}   
          
 var updateGroupPracticeList = function(pracs)
 {
     
    $("#ul-gp-list").selectable( "destroy" )
    $("#ul-gp-list").empty();
    
    for(var i in pracs)
    {
        var li = document.createElement("li");
        li.innerHTML = pracs[i].title;
        li.id =  pracs[i].id;    
        $("#ul-gp-list").append(li);

    }
    
    
    $("#ul-gp-list").selectable();
     
 } 
 
 var addPracticeToGroup = function()
 {
     var practicelist = $('#ul-pg .ui-selected');
     var grouplist = $('#ul-groups-list .ui-selected');
     var practice = $('#ul-pg .ui-selected').attr('id');
     var group = $('#ul-groups-list .ui-selected').attr('id');
       if(practice && group)
       {
           if(practicelist.length > 1 && grouplist.length>1)
           {
               $("#err-message").empty();
            $("#err-message").append("Debes seleccionar solo un grupo y una practica");
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
               
           }else if(practicelist.length > 1)
           {
                $("#err-message").empty();
                $("#err-message").append("Debes seleccionar solo  una practica");
                $("#err-message").dialog({
                    resizable: false,
                    height:200,
                    modal: true,
                    buttons: {
                        "Ok": function() {
                            $( this ).dialog( "close" );
                        }
                    }
                   
               })
           }
           else if( grouplist.length>1)
           {
               
                   $("#err-message").empty();
                $("#err-message").append("Debes seleccionar solo un grupo");
                $("#err-message").dialog({
                    resizable: false,
                    height:200,
                    modal: true,
                    buttons: {
                        "Ok": function() {
                            $( this ).dialog( "close" );
                        }
                    }
               })
           }
           else
           {
               socket.emit("add-practice-to-group",{group: group, practice: practice});  
           }

       }
       else
       {
            $("#err-message").empty();
            $("#err-message").append("Practica o grupo no seleccionados");
            $("#err-message").dialog({
                resizable: false,
                height:200,
                modal: true,
                buttons: {
                    "Ok": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
       }
     
 }         
           
});
