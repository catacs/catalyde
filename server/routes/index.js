/**
  * Module dependencies.
  */
//var db = require('../db');
var PasswordReset = require('../models/passwordreset');
var parseCookie   = require('connect').utils.parseCookie;
var bcrypt = require('bcrypt');
var appName = "Catalyde";

module.exports = {

 

   // app.get('/'...)
  index: function(req, res) {
    res.render('index.jade', { locals:
      { title: appName, 
        currentUser: req.user }
    });
  },
  
  // app.get('/register'...)
  getRegister: function(req, res) {
    res.render('register.jade');
  },

  // app.post('/register'...)
  postRegister: function(req, res) {
  	//console.log(req);
    DB.saveUser({
      fname : req.param('name.first')
    , lname : req.param('name.last')
    , type  : req.param('usertype')
    , email : req.param('email')
    , password : req.param('password')
    }, function(err,docs) {
    	if(!err)
      		log.info('New user registered: '+req.param('name.first'));
        res.redirect('/login');
    });
  },
  // app.get('/login', ...
  login: function(req, res) {
    res.render('login.jade',{
                                locals: { 
                                            title: appName
                                },
                                message: req.flash('error') 
    });
  },
  
  
  
  
  // after login
  postlogin: function(req, res) {
 
  	var ipAddress,username,time;
	//this code to get client IP address
	var forwardedIpsStr = req.header('x-forwarded-for'); 
	
	if (forwardedIpsStr) {
		// 'x-forwarded-for' header may return multiple IP addresses in
		// the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
		// the first one
		var forwardedIps = forwardedIpsStr.split(',');
		ipAddress = forwardedIps[0];
	}
	if (!ipAddress) {
		// Ensure getting client IP address still works in
		// development environment
		ipAddress = req.connection.remoteAddress;
	}
  
  	
  	//console.log(req);
  	
  	userid=req.user._id;
  	req.session.currentUser=userid;
    DB.loadUser({_id: userid}, function(err,user){
        
            req.session.currentUserType=user.type;
            
            time= new Date();
            DB.saveLoginEntry({
              email : userid
            , time  : time.toString()
            , hostIP  : ipAddress
            }, function(err,docs) {
                //if(!err)
                    //console.log('User: '+userid+' IP:'+ipAddress+' Time:'+time.toString());
                res.redirect('/')
                
            });
                    
        })

  },
  // app.get('/logout'...)
  logout: function(req, res){
  	log.info('User log out: '+ req.session.currentUser)
  	
    req.logout();
    res.redirect('/');
  },
  admin: function(req, res) {
    log.warn('Administration init');
    res.render('admin.jade',{locals: {title: appName}});
  },
  error: function(req, res) {
    res.render('error.jade',{locals: {title: appName}});
  },
  forgotPassword: function(req,res)
  {
      log.warn('Forgot Pasword')
      res.render('forgot-password.jade', {
      title: appName,
      passwordSent: req.query.passwordSent,
      password: '',
      error: req.query.error
    });
  },
  postForgotPassword: function(req,res)
  {
    email = req.param('email');
    if (email) {
      DB.loadUser({email: email}, function (error, user) {
        if (user && user.hash) {
            
          DB.loadPasswordReset({userid: user._id}, function(err,ps){
              if(ps == null)
              {
                  var ps =  new PasswordReset({userid: user._id,oldpasshash: encodeURIComponent(user.hash), time: new Date()});
                  var userID = new Buffer(ps.userid).toString('base64');
                  log.warn(ps._id);
                  var psID = new Buffer(ps._id.toString()).toString('base64');
                  log.warn(psID);
                  var resetLink = 'https:localhost:8123' + "/reset-password/"+userID+"/"+psID; 
                  var resetMessage = "Hi " + user.name + "!<br /> Click to reset your password: <a href=\"" + resetLink + "\">" + resetLink + "</a>!";
                  DB.savePasswordReset(ps,function(err,r){});
                  log.info(resetLink);
                  mail.sendMail({
                    from: 'Catalyde < no-reply@catalyde.com >',
                    to: email,
                    subject: 'Password Reset',
                    text:resetMessage,
                  });
                  res.redirect('/forgot-password/?passwordSent=true');
               }
               else   
                    res.redirect('/forgot-password/?error=AlreadyReset');
          })

        }
        else {
          res.redirect('/forgot-password/?error=AccountNotFound');
        }
      });
    }
    else {
      res.redirect('/forgot-password/?error=NoEmailGiven');
    }
  },
  resetPassword: function(req,res)
  {
      DB.loadPasswordReset({userid: userid}, function(err,ps){
              if(ps)
              {
                res.render('reset-password.jade', {locals: { 
                                                        title: appName,
                                                        userid: req.params.userid,
                                                        verify: req.params.verify
                                            },
                                            message: "" })
               }
               else
               {
                   res.render('error.jade',{locals: {title: appName}});
               }
       })                   
        
  },
  postResetPassword: function(req,res)
  {
      //log.info("PASS: "+ req.param('password')+"CONFIRM: "+ verify);
      if(req.param('password')=="" || req.param('password')!=req.param('confirm-password'))
          res.render('reset-password.jade', {locals: { 
                                                title: appName,
                                                userid: req.params.userid,
                                                verify: req.params.verify
                                    },
                                    message: "Contraseña incorrecta." })
     else
     {
        var userid = new Buffer(req.params.userid, 'base64').toString('utf8');
        var verify = new Buffer(req.params.verify, 'base64').toString('utf8');
        DB.loadUser({_id: userid}, function(err, user)
        {
            if(user)
            {
                var password = req.param('password');
                var salt = bcrypt.genSaltSync(10);
                user.hash = bcrypt.hashSync(password, salt);
                user.salt = salt;
                DB.updateUser(user,function(err,user)
                {
                    if(!err)
                    {
                        DB.loadPasswordReset({userid: user._id}, function(err,ps){
                            if(ps)
                            {
                                DB.removePasswordReset(ps,function(err)
                                {
                                    if(!err)
                                        res.redirect("/");
                                    
                                })
                            }
                            else
                                res.redirect("/");
                                     
                        });
                    }
                    else
                       res.render('reset-password.jade', {locals: { 
                                                title: appName,
                                                userid: req.params.userid,
                                                verify: req.params.verify
                                    },
                                    message: "La actualización de la contraseña ha fallado." })
                })
            }
            
            
        })
       
     }
        
  }
  
};
