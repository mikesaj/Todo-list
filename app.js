/* app.js
* This file contains the projects roadmap 
  i.e project libraries, routes, etc..

* Assignment By:
*  -Michael Sajuyigbe: 7434350
*  -Dhruvkumar Patel: 7453756
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// Cookie/Session initialization
var cookieParser = require('cookie-parser');
var session = require('express-session')

var bodyParser = require('body-parser');

// MongoDB initialization
var mongo = require('mongodb');

// Project routes definition
var routes = require('./routes/post_requests');
var get_requests = require('./routes/get_requests');

// Express framework initialization
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session global visibility
app.use(session({
  secret: 'klu34$^hli$#hyb4*387693#42y8o7bf',
  resave: true,
  saveUninitialized: true
}));


app.use('/', routes);
app.use(get_requests);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
