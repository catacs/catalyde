
/** PasswordResetSchema Schema for Catalyde **/

var mongoose = require('mongoose');
var ttl = require('mongoose-ttl');
var Schema = mongoose.Schema;

var PasswordResetSchema = new Schema({
    userid: { type: String, required: true  }
  , oldpasshash: { type: String, required: true  } 
  , time:  { type: Date, required: true }
});
PasswordResetSchema.plugin(ttl, { ttl: 14400000 }); //available 4 hours after this time will be deleted
module.exports = mongoose.model('PasswordReset', PasswordResetSchema);