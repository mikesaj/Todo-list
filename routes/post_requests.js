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


/* Route: new_todo_Item
Routing get request for '/new_todo_Item' link route */
router.get('/new_todo_item',function (req,res) {
  res.render('new_todo_item', {title: 'Add Todo Item', id : _id});
});

/* Route: Add User
Routing post request for '/adduser' link route */
router.post('/adduser', function(req, res) {

  // JSON data 
  db_data = { 
    first_name: req.body.first_name, 
    Last_name:req.body.last_name, 
    email:req.body.email 
  };
        
  redirect_url = "new_todo_item";
  collection_name = "users";
  insert_into_db(req, res);
  
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
      //_id of last insert record
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
