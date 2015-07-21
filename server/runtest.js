/** Testing insert/delete/update objects from mongodb **/

var DB = require('./db');
var conn = 'mongodb://localhost/ACEditor';
var User = require('./models/user');
var Block = require('./models/block');
var Group = require('./models/group');
var UserBlock = require('./models/userblock');
var Practice = require('./models/practice');
DB.startup(conn);



//Testing DB

/******************Defining objects***************************/

user = {
    fname: 'First'
  , lname: 'Second'
  , type:  'student' 
  , groups: []
  , email: 'firstuser@mail.com'
  , password: 'pass'
};
DB.saveUser(user,function(err,user){
                
                if(err)
                    callback(err);
    
    });

/*b = new Block({    
		 bid:  'B1' 
  	   , editable: true
       , buttons:  [] 
       });
cb = new Block.Code({    
		 bid:  'CB1' 
  	   , editable: true
       , buttons:  [] 
       , content: "cout << \" hola mundeños \"<<endl; "});
       
//DB.saveBlock(cb,function(err,cb1){ if(err) console.log("errrrrrrrrr") });
       */
mdb = new Block.MarkDown({    
		 bid:  'MDB1' 
  	   , editable: true
       , buttons:  [] 
       , content:  "El primer programa en C\nIntroduce el siguiente código fuente en el editor de Dev-C++ y guárdalo como `hola.c`\n ```\n #include <stdio.h>\n#include <conio.h>\nint main() { /* cabecera de la funcion principal */\nfprintf(stdout,\"Hola!\n\");/* imprime en pantalla */\ngetch();/* espera a que pulses una tecla */\nreturn 0; /* hace falta porque main lleva int */\n}```"
       });
/*
//DB.saveBlock(mdb,function(err,msb1){ if(err) console.log("errrrrrrrrr") });
ub = new UserBlock({    
	uid:    'uid'
  , defblock: '00000000000000000000'
  , ublocks:  ['frgadfgafgagafg234er23r','sdagafgq3rgq43gergq4gtq3gaq34'] });
p = new Practice({
	title: "Practica 1",
    pid:  'P1'
  , jadeTemplate: 'sdgdsgsdgfsfgsdgf'
  , content:  ['MDB1','CB1'] //an array with blockid
  
});
DB.savePractice(p,function(err,p){
	if(!err)
		console.log("Saved!!")		
		
})

g = new Group({
    gid:      'G1'
  , description:  'First group'
  , practices:    ['P1','P2','P3']
  
});
DB.saveGroup(g,function(err,g){
                
                if(err)
                    callback(err);
    
    });


/*****************************************************/

/*
function testuser(o,callback)
{
	//insert user
	DB.saveUser(o,function(err,user){
				
				if(err)
					callback(err);
					
				//update user
				//delete user
	
				callback(null);
	
	});

	
}

function testblock(o,callback)
{
	//insert block
	DB.saveBlock(o,function(err,b1){
			//update block
				
			DB.loadBlock({bid: b1.bid}, function(err, b2)
			{
				if(err)
					callback(err);
				else
				{
					b2.bid= 'B2';
					DB.updateBlock(b2,function(err)
					{
						if(err)
							callback(err);
						//delete block
						DB.removeBlock(b2, function(err)
						{
							if(err)
								callback(err);
							callback(null);
							
						});
						
					});	
				}
			});
		callback(null);
	});

	
}

function testcodeblock(o,callback)
{
	//insert code block
	DB.saveBlock(o,function(err,cb1){
			//update code block
			DB.loadBlock({bid: cb1.bid}, function(err, cb2)
			{
				if(err)
				{
					console.log("Error???");
					callback(err);
				}
				else
				{
					cb2.bid= 'CB2';
					
					DB.updateBlock(cb2,function(err)
					{
						if(err)
							callback(err);
						//delete code block
						DB.removeBlock(cb2, function(err)
						{
							if(err)
								callback(err);
							callback(null);
							
						});
						
					});	
				}
			});

	
	});

	
};
/*
function testmdblock(o,callback)
{
	//insert markdown block	
	DB.saveBlock(o,function(err,mdb1){
			//update markdown block
			DB.loadBlock({bid: mdb1.bid}, function(err, mdb2)
			{
				if(err)
					callback(err);
				else
				{
					mdb2.bid = 'MDB2';
					DB.updateBlock(mdb2,function(err)
					{
						if(err)
							callback(err);
						//delete markdown block
						DB.removeBlock(mdb2, function(err)
						{
							if(err)
								callback(err);
							callback(null);
							
						});
						
					});	
				}
			});

	});
	
}

function testuserblock(o,callback)
{
	//insert userblock	
	DB.saveUserBlock(o,function(err,ub1){
		//update userblock
		DB.loadUserBlock({uid: ub1.uid}, function(err, ub2)
		{
			if(err)
				callback(err);
			else
			{
				DB.updateUserBlock(ub2,function(err)
				{
					if(err)
						callback(err);
						
					//delete userblock
					DB.removeUserBlock(ub2, function(err)
					{
						if(err)
							callback(err);
						callback(null);
						
					});
					
				});	
			}
		});
	
	});
	
}

function testpractice(o,callback)
{
	//insert practice
	DB.savePractice(o,function(err,p1){
			//update practice
			DB.loadPractice({pid: p1.pid}, function(err, p2)
			{
				if(err)
					callback(err);
				else
				{
					p2.pid= 'P2';
					DB.updatePractice(p2,function(err,p3)
					{
						if(err)
							callback(err);
						//delete practice
						
						DB.removePractice(p3, function(err,p4)
						{
							if(err)
								callback(err);
						
							callback(null);
							
						});
						
					});	
				}
			});

	});

	
};


function testgroup(o,callback)
{
	//insert group
	DB.saveGroup(o,function(err,g1){
		
		DB.loadGroup({gid: g1.gid}, function(err, g2)
		{
			if(err)
				callback(err);
			else
			{
				g2.gid='G2';
				//update group
				DB.updateGroup(g2,function(err)
				{
					if(err)
						callback(err);
						//delete group
					DB.removeGroup(g2, function(err)
					{
						if(err)
							callback(err);
						callback(null);
						
					});
					
				});	
			}
		});
			
		
		
	});

	
}



/*	testuser(user,function(err,info) 
	{
		
		if(err)
		{
			console.log('user test: ERROR ');
			throw err;
		}
		else
			console.log('User test: OK!');
	});
	testblock(b,function(err) 
	{
		if(err)
		{
			console.log('Block test: ERROR');
			throw err;
		}
		else
			console.log('Block test: OK!');
	});
	testcodeblock(cb,function(err) 
	{
		if(err)
		{
			console.log('Code block test: ERROR');
			throw err;
		}
		else
			console.log('Code block test: OK!');
	});
	
	testmdblock(mdb,function(err) 
	{
		if(err)
		{
			console.log('Markdown block test: ERROR');
			throw err;
		}
		else
			console.log('Markdown block test: OK!');
	});
	testuserblock(ub,function(err) 
	{
		if(err)
		{
			console.log('Userblock test: ERROR');
						throw err;
		}
		else
			console.log('Userblock test: OK!');
	});
	testcodeuserblock(cub,function(err) 
	{
		if(err)
		{
			
			console.log('code userblock test: ERROR');
			throw err;
		}
		else
			console.log('code userblock test: OK!');
	});
	testmduserblock(mdub,function(err) 
	{
		if(err)
		{
			
			console.log('markdown userblock test: ERROR');
			throw err;
		}
		else
			console.log('markdown userblock test: OK!');
	});
	testpractice(p,function(err) 
	{
		if(err)
		{
			
			console.log('practice test: ERROR');
			throw err;
			
		}
		else
			console.log('Practice test: OK!');
	});
	testgroup(g,function(err) 
	{
		if(err)
		{
			
			console.log('group test: ERROR');
			throw err;
		}
		else
			console.log('Group test: OK!')
	});
	
	p1 = new Practice({
    pid:  'P1'
  , title: 'Practica 1'
  , jadeTemplate: 'a'
  , content:  ['CB1'] //an array with blockid
  
});

	p2 = new Practice({
    pid:  'P2'
  , title: 'Practica 2'
  , jadeTemplate: 'b'
  , content:  ['CB2'] //an array with blockid
  
});
	p3 = new Practice({
    pid:  'P3'
  , title: 'Practica 3'
  , jadeTemplate: 'c'
  , content:  ['CB3'] //an array with blockid
  
});
DB.savePractice(p1,function(err,p1){
	
	
	
});
DB.savePractice(p2,function(err,p1){
	
	
	
});
DB.savePractice(p3,function(err,p1){
	
	
	
});

DB.saveUser(user,function(err,user){
				
				if(err)
					callback(err);
	
	});
	
		DB.saveGroup(g,function(err,g1){
			if(err)
				console.log(err);
		});
		
*/
/*
DB.loadUser({_id:"4fb3bbed7c95709b0f00000f"},function(err,user){
	console.log(user);
})*/
