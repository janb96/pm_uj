var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var microserviceRouter = require('./routes/microservice');

var app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', authRouter);
app.use('/user', userRouter);
app.use('/microservice', microserviceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
