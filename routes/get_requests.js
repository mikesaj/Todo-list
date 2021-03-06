/*
* Get_requests.js
* This file contains get methods and implementations for this project

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


/* 
Route: index
GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ToDo Application' });
});


/* Route: Create_Account
Routing get request for '/Create_Account' link route */
router.get('/Create_Account',function (req,res) {
  res.render('signup', {title: 'User Registration'});
});


/* Route: Sign_In
Routing get request for '/Sign_In' link route */
router.get('/Sign_In',function (req,res) {
  res.render('signin', {title: 'Sign In'});
});

/* Route: Signout 
Routing get request for '/exit_app' link route */
router.get('/exit_app',function (req,res) {
  //Destroys session data and redirect to home oage
  req.session.destroy(function(err) {
  	//Redirect to home page
    res.redirect('/');    
  })
  
});

/* Route: Profile
Routing get request for '/Profile' link route */
router.get('/Profile',function (req,res) {
  res.render('profile', {title: 'Profile Page', user_data:req.session.user_data});
});



/* Route: Details
Routing get request for '/Details' link route */
router.get('/map',function (req,res) {
  var tagid = req.query.tagid;

    session_model.get_todo_item(tagid, function(result) {
    
    // Get the lenght of the result
    var resultLen = Object.keys(result).length;

    // Check if result has data
    if(resultLen > 0){

        var query_result = result[0];

        //Session Data
        var user_data = {
          title: query_result.title,
          date: query_result.date,         
          location: query_result.location,   
          notes: query_result.notes        
        }


      // Get current todo-list by tagid
      res.render('details', {title: 'Todo Event', todo_item: user_data});


      console.dir( query_result._id +" ##vv" );
    }


    });




});

/* Route: Json_data
Routing Get request for '/get_json' link route */
router.get('/get_json', function(req, res) {
        
  collection_name = "todo_list";
  get_json_data_from_db(req, res);
  
});


/* Route: thelist
Get list from DB
*/
router.get('/thelist', function(req,res) {
  MongoClient.connect(url, function(err,db) {
   
    if(err){
      console.log('Unable to connect to the server');
   
   }
    else{
      console.log('Connection Established');
      
      var collection = db.collection('users');
      collection.find({}).toArray(function(err, result){
        if (err){
          res.send(err);
        }
        else if (result.length){
          res.render('users_list', { "userslist":result });
        }
        else{
          res.send('No documents found');
        }
        db.close();
      });
    }
  })
});


/* Route: users_list
Routing get request for '/users_list' link route */
router.get('/final',function (req,res) {

  MongoClient.connect(url, function(err,db) {
   
    if(err){
      console.log('Unable to connect to the server');
   
   }
    else{
      console.log('Connection Established');
      
      var collection = db.collection('todo_list');
      //var collection = db.collection('users');
      
collection.aggregate([
  {$sort: {_id: -1}},
  {$limit: 1},
  {
  $lookup:{
    from: "users",
    localField: "_id",
    foreignField: "_id",
    as: "other"    
   }
  }],function(err, result){
    
        if (err){
          res.send(err);
        }
        else if (result.length){
          
          //console.log("data: " + result);
          
          res.render('todo_list', { "record":result });
        }
        else{
          res.send('No documents found');
        }
        db.close();
      });
    }
  })
  
});


/******************************* Get Json_data FROM DB FUNCTION *******************************/
function get_json_data_from_db(req, res)
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
      collection.aggregate({
    $lookup:{
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "other"    
    }
  }, function (err,result) {
        
        if(err){
          console.log(err);
        }
        else{
          var data = JSON.stringify(result)
          //console.log(data);
          res.json(result[0]);
        }
        db.close();
      })
   }    
  });
   
}
/******************************* END OF GET Json_data FUNCTION *******************************/

module.exports = router;
