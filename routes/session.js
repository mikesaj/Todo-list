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

/*** INSERT INTO DB FUNCTION ***/
function insert_into_db(collection_name, db_data, callback)
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
        
        if(err){
          // null callback if error occurs during insert operation
          callback(null);
        }
        else{
         // callback result, if insert statement was successful
          callback(result);
        }
        db.close();
      });
   }    
  });
   
}




module.exports = {

  /* @Return boolean
   * Verifies Username*/
  login: function(username,password, cb) {

    // Users Collection
    var collection_name = "users";

    // Mongo query contraint
    var query_obj = {
      email: username,
      password: password
    };

    // get data from db
    get_db_data(collection_name, query_obj, function (result) {
          cb(result);
    });     
  },
  get_todo_list: function(id, cb) {

    // Convert 'int' datatype into mongodb-objectId
    var objectId = new mongodb.ObjectID(id);

    var collection_name = "todo_list"; /* todo_list Collection */

    var query_obj = {user_id: objectId}; /* Mongo query contraint */

    // get data from db
    get_db_data(collection_name, query_obj, function (result) {
          cb(result);
    }); 
  },
  add_new_user: function(newUserData, cb) {
    
    // insert user into db
    var collection_name = "users"; /* users collection */
    insert_into_db(collection_name, newUserData, function (result) {
          //cb(result);
          var res = result.ops[0];
          //console.log( res);
          cb(res);
    });  
  }
}



  
