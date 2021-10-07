var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let swaggerJsDoc = require("swagger-jsdoc");
let swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "CryptographicMicroservice API",
      description: "CryptographicMicroservice is responsible for encrypting information in the example application",
      contact: {
        name: "Jan Boduch"
      },
      servers: ["http://localhost:4000"]
    }
  },
  apis: ["./routes/*"]
};

var cryptoRouter = require('./routes/crypto');
var bcryptRouter = require('./routes/bcrypt');
var sha256Router = require('./routes/sha256');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/crypto', cryptoRouter);
app.use('/bcrypt', bcryptRouter);
app.use('/sha256', sha256Router);

let swaggerD = swaggerJsDoc(swaggerOptions);
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerD));

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
