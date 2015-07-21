
/** LoginEntry Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginSchema = new Schema({
    email: { type: String, required: true  }
  , time:  { type: Date, required: true }
  , hostIP:  { type: String, required: true }
});
module.exports = mongoose.model('LoginEntry', LoginSchema);