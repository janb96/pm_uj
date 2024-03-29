var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo_db_connection = require("./connect_mongoose");
const cors = require('cors');

var categoriesRouter = require('./routes/categories');
var subcategoriesRouter = require('./routes/subcategories');
var announcementsRouter = require('./routes/announcements');
var announcementRouter = require('./routes/announcement');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/categories', categoriesRouter);
app.use('/subcategories', subcategoriesRouter);
app.use('/announcements', announcementsRouter);
app.use('/announcement', announcementRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.send("404");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
