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

  var query_result;


// @return result in JSON

function get_db_data(collection_name, query_obj)
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
      collection.find(query_obj).toArray(function(err2, result){
        
        if(err2){
          console.log(err2);
        }
        else{

          // db result for the query 
          query_result = JSON.stringify(result);
          return query_result;
          //console.log(query_result);
        }
        db.close();
      })
   }    
  });
   return query_result;
}



module.exports = {

  /* @Return boolean
   * Verifies Username and Password */
  login: function(username, password) {
    return true;
  },

  /* @Param Username 
   * Sets the session global varible after login */     
  set_session_data: function(username) {
    // 
  },

  /* @Return Session data in JSON 
   * Gets the session global data  */  
  get_session_data: function() {
    return "Hola";
  },

  // Check if username exist
  username_exist: function(username, callback){

    // Users Collection
    var collection_name = "users";

    // Mongo query contraint
    var query_obj = {email: username};

    // get data from db
    return get_db_data(collection_name, query_obj);
  }
  
  
};