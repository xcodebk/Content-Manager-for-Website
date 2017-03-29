var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var multer = require('multer');
var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');
var filemanager = require('./filemanager');
var category = require('./routes/category');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb://hungthinh:tumotdenchin@ds013545.mlab.com:13545/demo');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//using for file filemanager
var config = JSON.parse(
  fs.readFileSync('public/Filemanager/scripts/filemanager.config.js')
);
config.connector = {

  serverRoot: './public',

  fmSrcPath: '/Filemanager',

  uploader: multer({ dest: 'uploads' })
};
config.options.fileRoot = require('path').join(__dirname, 'public/');
var logger = {
  debug: util.log,
  info: util.log,
  error: util.log
};
var fm = filemanager(config, logger);
app.use('/fm', fm);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/article', article);
app.use('/users', users);
app.use('/category', category);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
