/** File Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicFile = new Schema({
    filename:      { type: String, required: true}
  , data:          { type: String } 
});
module.exports = mongoose.model('PublicFile', PublicFile);