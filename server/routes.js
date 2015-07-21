/** routes.js
  */

var passport = require('passport');
var start=require('./routes/index');
var practices= require('./routes/practice');


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
  	req.username=req.param('email');
  	return next(); 
  }
  res.redirect('/login');
}

function checkAdmin(req, res, next) {
    if( req.session.currentUserType== "admin")
    {
        return next();
        
    }
    res.redirect('/error');
}

module.exports = function(server) {

  server.get('/',ensureAuthenticated,start.index);

  //server.get('/register', start.getRegister);
  //server.post('/register', start.postRegister);
  server.get('/pr', function(req,res){
  		res.render('practice');
  } );
  server.get('/login', start.login);
  server.post('/login', passport.authenticate('local', 
                                              {failureRedirect: '/login',
                                               failureFlash: true,
                                               badRequestMessage: 'Por favor rellene todos los campos'
                                               }),
                                               start.postlogin);
  server.get('/practice/:prid', ensureAuthenticated,practices.getPractice);

  server.get('/logout', start.logout);
  
  server.get('/adminlogin',start.adminlogin)
  server.post('/adminlogin', checkAdmin, start.admin);
  server.get('/admin',ensureAuthenticated,checkAdmin, start.admin);
  server.get('/error',start.error);
  server.get('/forgot-password',start.forgotPassword);
  server.post('/forgot-password',start.postForgotPassword);
  server.get('/reset-password/:userid/:verify',start.resetPassword);
  server.post('/reset-password/:userid/:verify',start.postResetPassword);
  practice = function(){ return practices};
  
  return this;


}