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


/******************************* GET METHODS *******************************/

/* 
Route: index
GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

/* Route: todo_list
Routing get request for '/todo_list' link route */
router.get('/todo_list',function (req,res) {
  res.render('new_todo', {title: 'Todo List', id : _id});
});

/* Route: newuser
Routing get request for '/newuser' link route */
router.get('/newuser',function (req,res) {
  res.render('signup', {title: 'Add User'});
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
      
collection.aggregate([{
  $lookup:{
    from: "users",
    localField: "_id",
    foreignField: "_id",
    as: "other"    
   }
  }],function(err, result){
    //console.log(" Rice "+result.length);
    //console.dir(result);
  //});
      
      
      
      //collection.find({}).toArray(function(err, result){

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
  
  //res.render('users_list', {title: 'users list'});

});



/******************************* END OF GET METHODS *******************************/


/******************************* POST METHODS *******************************/

/* Route: Add_list
Routing post request for '/add_list' link route */
router.post('/add_list', function(req, res) {

  /* Json data */
  db_data = { 
    _id: req.body._id, 
    title: req.body.title, 
    location:req.body.location, 
    notes:req.body.notes, 
  };
        
  redirect_url = "final";
  collection_name = "todo_list";
  insert_into_db(req, res);
  
});

/* Route: Add User
Routing post request for '/adduser' link route */
router.post('/adduser', function(req, res) {

  // JSON data 
  db_data = { 
    first_name: req.body.first_name, 
    Last_name:req.body.last_name 
  };
        
  redirect_url = "todo_list";
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
/******************************* END OF DB INSERT FUNCTION *******************************/


module.exports = router;
