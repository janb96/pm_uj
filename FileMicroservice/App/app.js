var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
let formData = require('express-form-data');

var pdfRouter = require('./routes/pdf');
var imgRouter = require('./routes/img');

var app = express();
app.use(cors());
app.use(formData.parse({maxFilesSize : "10mb", maxFieldsSize: 12 * 1024 * 1024 }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pdf', pdfRouter);
app.use('/img', imgRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.send("404");
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
