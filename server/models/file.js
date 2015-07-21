/** File Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var File = new Schema({
    filename:      { type: String, required: true}
  , data:          { data: Buffer, contentType: String} 
});
module.exports = mongoose.model('File', File);