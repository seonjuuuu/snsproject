var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

var indexRouter = require('./routes/index');
var mainpageRouter = require('./routes/mainpage');
var editinfoRouter = require('./routes/editinfo');
var profileRouter = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '@#@$EVERYWHERE#@$#$',
  resave: false, // 세션공간에 강제적인 저장
  saveUninitialized: true ,// 초기화되지 않은채 저장되는 세션 (새로 생성, 수정 없음 등)
  // store
  store: new FileStore(fileStoreOptions),
  
 }));



app.use('/', indexRouter);
app.use('/mainpage', mainpageRouter);
app.use('/editinfo', editinfoRouter);
app.use('/profile', profileRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
