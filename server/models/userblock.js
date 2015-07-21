/** UserBlock Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserBlock = new Schema({
    uid:      { type: String, required: true }
  , defblock: { type: String, required: true } //original block
  , ublocks:  { type: String, required: true}  //user specific block
});
module.exports = mongoose.model('UserBlock', UserBlock);


