/** Practice Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Practice = new Schema({
  //  pid:  			{ type: String, unique: true , required: true }, 
    title: 			{type: String, required: true } // modified recently
  ,  longtitle:			{type: String, required: true }
  , actions:        {type: String, required: true}
  //, jadeTemplate:	{ type: String, required: true }
  , dustTemplates:	{ type: Schema.Types.Mixed}
  , content:     	{ type: Array, required: false } //an array with blockid
  , ids:            { type: Schema.Types.Mixed}
  , conf:           { type: Schema.Types.Mixed}
  , files:          { type: Schema.Types.Mixed }//array of files in mongodb
  
});
module.exports = mongoose.model('Practice', Practice);
