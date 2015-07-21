/** UserOptions Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserOptions = new Schema({
      uid:  { type: String, unique: true , required: true }
	, options: {type: Schema.Types.Mixed}
  
});
module.exports = mongoose.model('useroptions', UserOptions);