var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var spelareRouter = require('./routes/spelare');

var app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sttr0001:123Fotboll123@cluster0.15emuqb.mongodb.net/basket?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
console.log("Kopplingen lyckades!");
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/spelare', spelareRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
