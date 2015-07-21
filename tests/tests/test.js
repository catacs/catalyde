var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var Block= require('../server/models/block');


//var recordid = ObjectID.createFromHexString(str_recordid);
/*UserGoal._collection.update({_id: recordid},
      {'$set': {key: value}}, function(err, data) { ... });
*/
// connect to database
module.exports = {

  // initialize DB
  startup: function(dbToUse) {
    mongoose.connect(dbToUse);
    // Check connection to mongoDB
    mongoose.connection.on('open', function() {
      console.log('We have connected to mongodb');
    }); 

  },
     SaveCode: function(code, callback) {
    var newCode = new Block(code);
    
     newCode.save(function(err) {
      if (err) {
      	console.log('Code node saved');
      	throw err;
      	}
      console.log('Code Saved');
      callback(null, code);
    });
  },
    UpdateCode: function(code, callback) {
    //console.log(userInfo['fname']);
    var newCode = new Block(code);
     newCode.remove(function(err) {
      if (err) {
      	console.log('Code not deleted');
      	throw err;
      	}
      console.log('Code deleted');
      callback(null, code);
    });
     newCode.save(function(err) {
      if (err) {
      	console.log('Code node saved');
      	throw err;
      	}
      console.log('Code Saved');
      callback(null, code);
    });
  },
    LoadBlock: function(query,callback) {
    Block.findOne(query, function(err, bls) {
      callback(null, bls);
    });
  }

}