var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

// MongoClient initialization
var MongoClient = mongodb.MongoClient;
//Mongodb Url
var url = 'mongodb://localhost:27017/assignment_db';

//table
//var user_collection = db.collection('users');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* To-do List Page */
router.get('/thelist', function(req,res) {
  //var MongoClient = mongodb.MongoClient;
  //var url = 'mongodb://localhost:27017/assignment_db';
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
          res.render('users_list',{
            "userslist":result
          });
        }
        else{
          res.send('No documents found');
        }
        db.close();
      });
    }
  })
});

/* Routing get request for '/todo_list' link route */
router.get('/todo_list',function (req,res) {
  res.render('user_todo_list', {title: 'Todo List'});
});

/* Routing get request for '/newuser' link route */
router.get('/newuser',function (req,res) {
  res.render('newuser', {title: 'Add User'});
});



/******************************* POST REQUEST *******************************/

/* Add_list
Routing post request for '/add_list' link route */
router.post('/add_list', function(req, res) {

  /* Json data */
  var db_data = { 
    title: req.body.title, 
    location:req.body.location, 
    notes:req.body.notes, 
  };
        
  var redirect_url = "final";
  insert_into_db(db_data, redirect_url);
  
});

/* Add User
Routing post request for '/adduser' link route */
router.post('/adduser', function(req, res) {

  // Json data 
  var db_data = { 
    first_name: req.body.first_name, 
    Last_name:req.body.last_name 
  };
        
  var redirect_url = "todo_list";
  insert_into_db(db_data, redirect_url, req, res);
  
});

/******************************* END OF POST REQUEST *******************************/


//Insert to db function
function insert_into_db(db_data, redirect_url, req, res){
  //MongoDB connection function
  MongoClient.connect(url, function(err,db) {  
    
   if(err){
     console.log('Unable to connect to the server');   
   }
   else{
      console.log('Connected to the server');
      //insert statement into mongodb
      var user_collection = db.collection('users');
      user_collection.insert([db_data], function (err,result) {
        
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
