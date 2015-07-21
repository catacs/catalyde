/** User Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passport = require('passport');
var bcrypt = require('bcrypt');

// Define schema
var UserSchema = new Schema({
    name : { 
        first: { type: String, required: true } 
      , last: { type: String, required: true  }
    }
  , type:  { type: String, enum: ['teacher', 'student','admin'], required: true  }
  , groups:{ type: Array }
//  , config:{ type: mixed}
  , email: { type: String, unique: true   }
  , salt:  { type: String, required: true }
  , hash:  { type: String, required: true }
});


UserSchema
.virtual('password')
.get(function () {
  return this._password;
})

.set(function (password) {
  this._password = password;
  var salt = this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.hash, callback);
});

UserSchema.static('authenticate', function(email, password, callback) {
  this.findOne({ email: email }, function(err, user) {
      if (err) { 
            return callback(err,false,{ message: 'Error conectando a la base de datos' }); 
      }
      else{
              if (!user) 
              {
              	log.info('User '+email+' not found'); 
              	return callback(null, false,{ message: 'Usuario no existe o contraseña incorrecta' });
              }
              user.verifyPassword(password, function(err, passwordCorrect) {
                if (err) {
                	log.warn('User: '+user.email+' Failed verifying password');
                	return callback(err,false,{ message: 'Error conectando a la base de datos' }); 
                }
                else
                {
                    if (!passwordCorrect) { 
                    	log.warn('User: '+user.email+' Password incorrect');
                    	return callback(null, false,{ message: 'Usuario no existe o contraseña incorrecta' }); 
                    }
                    log.info('User: '+user.email+' signed in');
                    return callback(null, user,null);
                }
              });
      
      }
    });
});

module.exports = mongoose.model('User', UserSchema);