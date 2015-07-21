/** Group Schema for Catalyde **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Group = new Schema({
    //gid:      { type: String, required: true, unique: true }, 
    description:  { type: String, required: true }
  , practices:    { type: Array,  required: false} //an array with object with practiceid, startDate, endDate
  
});
module.exports = mongoose.model('Group', Group);