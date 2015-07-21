/** UserOptions Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserConfig = new Schema({
      uid:  { type: String,  required: true }
    , pid:  { type: String,  required: true }
	, config: {type: Schema.Types.Mixed}
  
});
module.exports = mongoose.model('userconfig', UserConfig);