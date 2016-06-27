/*
* Post_requests.js
* This file contains post methods and implementations for this project

* Assignment By:
*  -Michael Sajuyigbe: 7434350
*  -Dhruvkumar Patel: 7453756
*/
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

// session function
var session_model = require("./session.js");



// Variable declaration
var db_data;        
var redirect_url;
var collection_name;
var _id;

// MongoClient initialization
var MongoClient = mongodb.MongoClient;
//Mongodb Url
var url = 'mongodb://localhost:27017/assignment_db';


/******************************* POST METHODS *******************************/

/* Route: Add_list
Routing post request for '/add_list' link route */
router.post('/add_list', function(req, res) {

  //This imports several mongodb libraries
  var Db = require('mongodb').Db,
      MongoClient = require('mongodb').MongoClient,
      Server = require('mongodb').Server,
      ReplSetServers = require('mongodb').ReplSetServers,
      ObjectID = require('mongodb').ObjectID,
      Binary = require('mongodb').Binary,
      GridStore = require('mongodb').GridStore,
      Grid = require('mongodb').Grid,
      Code = require('mongodb').Code,
      assert = require('assert');


  // Create a new ObjectID
  var objectId = new ObjectID(req.body.id);


  /* Json data */
  db_data = { 
    user_id: objectId,//req.body.id, 
    title: req.body.title, 
    date:req.body.date, 
    location:req.body.location, 
    notes:req.body.notes, 
  };
        
  redirect_url = "get_json";//"final";
  collection_name = "todo_list";
  insert_into_db(req, res);
  
});


/* Route: dashboard
Routing get request for '/dashboard' link route */
router.get('/dashboard',function (req,res) {


    var id = req.session.user_data.id;

    session_model.get_todo_list(id, function(result) {
      // Get current user todo list json array
      res.render('new_todo_item', {title: 'Add Todo Item', todo_list: result, user_data : req.session.user_data});
    });
});


/* Route: profile
Routing get request for '/profile' link route from user login*/
router.post('/profile',function (req,res) {
  
  /* Json data */

var email = req.body.email;
var password = req.body.password;



  session_model.login(email, password, function(result) {
    
    // Get the lenght of the result
    var resultLen = Object.keys(result).length;

    // Check if result has data
    if(resultLen > 0){
        
        var query_result = result[0];

        //Session Data
        var user_data = {
          id:         query_result._id,
          first_name: query_result.first_name,  // equivalent to $_SESSION['first_name'] in PHP.
          last_name:  query_result.last_name,   
          email:      query_result.email              // equivalent to $_SESSION['email'] in PHP.
        }

        // Save into session 'user_data' variable 
        req.session.user_data = user_data;

        // render the user profile page
        res.render('Profile', {title: 'Profile Page', user_data: user_data});
    }
    else{ 
      // return user to sign-in page
      console.log("invalid username/password");
      res.render('signin', {title: 'Sign In'});  
    }
  
  });


});

/* Route: Add User
Routing post request for '/adduser' link route */
router.post('/adduser', function(req, res) {

  // JSON data 
  db_data = { 
    email:req.body.email, 
    first_name: req.body.first_name, 
    last_name:req.body.last_name, 
    password:req.body.password 
  };
        
  //redirect_url = "new_todo_item";
  collection_name = "users";
  //insert_into_db(req, res);

  session_model.add_new_user(db_data, function (user_data){
    if(user_data==null){
      // redirect, if returned data is null
      res.redirect("/Sign_In");
    }
    else{

        // Save into session 'user_data' variable
        user_data.id=user_data._id;
        req.session.user_data = user_data;

      console.dir(user_data._id);
      //_id = user_data.id;
      res.render('Profile', {title: 'Profile Page', user_data: user_data});
      // redirect if user_data contains data
    }
  });
  
});


/* Route: Login User
Routing post request for '/dashboard' link route */
router.post('/dashboard', function(req, res) {

  // JSON data 
  db_data = { 
    email:req.body.email,
    password:req.body.password 
  };
        
  redirect_url = "new_todo_item";
  collection_name = "users";

  //session_model.get_db_data(collection_name, db_data, redirect_url );
    
});

/******************************* END OF POST REQUEST *******************************/


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


module.exports = router;
