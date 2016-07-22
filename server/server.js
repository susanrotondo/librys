// Dependencies:
var
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  dotenv = require('dotenv').load({silent:true}),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  mongoose = require('mongoose'),
  hash = require('bcrypt-nodejs'),
  path = require('path'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  routes = require('./routes/api.js'),
  // bookRoutes = require('./routes/books.js'),
  User = require('./models/User.js')

// conncect to MongoDB
mongoose.connect(process.env.DB_URL, function(err) {
  if(err) return console.log(err);
  console.log('Connected to MongoDB (my-libris)');
});

// MIDDLEWARE:
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// encrypt the session cookie:
app.use(require('express-session')({
    secret: 'ficus graffiti',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// NOTE what is this/necessary?
// app.set('view engine', 'html');

// ROUTES:
app.use('/user/', routes);
// app.use('/api/books', bookRoutes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// ERROR HANDLERS:
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }))
});

app.listen(port, function() {
  console.log('Server running on port:', port);
});
