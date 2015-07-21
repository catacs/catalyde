/** Block Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Block = new Schema({
    b_tag:       { type: String }
  , type:        { type: String, default: 'Block'}
  , editable:    { type: Boolean, required: true}
  , buttons:     { type: Array}
  , checkbutton: { type: Boolean, default: false}
  , content:     { type: String}
  
});




var MarkDown = new Schema({
		content:  { type: String }
	  , type:     { type: String, default: 'MarkDown' }

});

var Code = new Schema({
	  content:  { type: String }
	, type:     { type: String, default: 'Code' }
});

var Text = new Schema({
	  content:  { type: String }
	, type:     { type: String, default: 'Text' }
});





Block.methods.iam = function() { return 'Block'; };
Code.methods.iam = function() { return 'Code'; };
MarkDown.methods.iam = function() { return 'MarkDown'; };
MarkDown.methods.iam = function() { return 'Text'; };

var Base = mongoose.model('Block', Block, 'blocks');
var exports = module.exports = Base;
Base.Code = mongoose.model('Code', Code, 'blocks');
Base.MarkDown = mongoose.model('MarkDown', MarkDown, 'blocks');
Base.Text = mongoose.model('Text', Text, 'blocks');

// Monkey path inheritance, seems to work

var init = Base.prototype.init;
init.Code = new Base.Code().__proto__;
init.MarkDown = new Base.MarkDown().__proto__;
Base.prototype.init = function (doc, fn) {
  var obj = init.apply(this,arguments);
  obj.__proto__ = init[doc._type];
  return obj;
};