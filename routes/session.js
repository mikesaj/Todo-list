/*
 * Session.js
 * This file handles session related Data processing

 * Assignment By:
 *  -Michael Sajuyigbe: 7434350
 *  -Dhruvkumar Patel: 7453756
 */
var mongodb = require('mongodb');

// MongoClient initialization
var MongoClient = mongodb.MongoClient;

// Mongodb Url
var url = 'mongodb://localhost:27017/assignment_db';

// DB Collection Name
var collection_name;

var db_result;


// @return result in JSON
function get_db_data(collection_name, query_obj, callback)
{
  //MongoDB connection function

  MongoClient.connect(url, function(err,db) { 
    
   if(err){
     console.log('Unable to connect to the server');   
   }
   else{
      console.log('Connected to the server');

      //Initialize Collection
      var collection = db.collection(collection_name);

      //Inject Statement into mongodb
      collection.find(query_obj).toArray(function(err, result){
        
        if(err){
          console.log(err);
          callback(null);
        }
        else{

          // db result for the query 
          callback(result);
        }
        db.close();
      })
   }    
  });

}

/******************************* INSERT TO DB FUNCTION *******************************/
function insert_into_db(req, res)
{
  //MongoDB connection function
  MongoClient.connect(url, function(err,db) {  
    
   if(err){
     console.log('Unable to connect to the server');   
   }
   else{
      console.log('Connected to the server');
      //Initialize Collection
      var collection = db.collection(collection_name);
      //Insert Statement into mongodb
      collection.insert([db_data], function (err,result) {
      //_id of record inserted
      _id = result.ops[0]._id;
        //console.log();
        
        
        if(err){
          console.log(err);
        }
        else{
         res.redirect(redirect_url);
        }
        db.close();
      });
   }    
  });
   
}




module.exports = {

  /* @Return boolean
   * Verifies Username*/
  login: function(username, cb) {

    // Users Collection
    var collection_name = "users";

    // Mongo query contraint
    var query_obj = {email: username};

    // get data from db
    get_db_data(collection_name, query_obj, function (result) {
          cb(result);
    });     
  },
  get_todo_list: function(id, cb) {


      var objectId = new mongodb.ObjectID(id);
      //var objectId =id;

    var collection_name = "todo_list"; /* todo_list Collection */

    var query_obj = {user_id: objectId}; /* Mongo query contraint */

    // get data from db
    get_db_data(collection_name, query_obj, function (result) {
          cb(result);
    }); 
  }
}



  
