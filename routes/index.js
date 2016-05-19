var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

// Variable declaration
var db_data;        
var redirect_url;
var collection_name;

// MongoClient initialization
var MongoClient = mongodb.MongoClient;
//Mongodb Url
var url = 'mongodb://localhost:27017/assignment_db';



/******************************* GET METHODS *******************************/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* To-do List Page 
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
/******************************* END OF GET METHODS *******************************/



/******************************* POST METHODS *******************************/

/* Add_list
Routing post request for '/add_list' link route */
router.post('/add_list', function(req, res) {

  /* Json data */
  db_data = { 
    title: req.body.title, 
    location:req.body.location, 
    notes:req.body.notes, 
  };
        
  redirect_url = "final";
  collection_name = "todo_list";
  insert_into_db(db_data, collection_name, redirect_url, req, res);
  
});

/* Add User
Routing post request for '/adduser' link route */
router.post('/adduser', function(req, res) {

  // JSON data 
  db_data = { 
    first_name: req.body.first_name, 
    Last_name:req.body.last_name 
  };
        
  redirect_url = "todo_list";
  collection_name = "users";
  insert_into_db(db_data, collection_name, redirect_url, req, res);
  
});

/******************************* END OF POST REQUEST *******************************/


/******************************* INSERT TO DB FUNCTION *******************************/
function insert_into_db(db_data, collection_name, redirect_url, req, res)
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
