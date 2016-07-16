// Dependencies:
var
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  mongoose = require('mongoose'),
  hash = require('bcrypt-nodejs'),
  path = require('path'),
  passport = require('passport')

// conncect to MongoDB
mongoose.connect('mongodb://localhost/my-libris', function(err) {
  if(err) return console.log(err);
  console.log('Connected to MongoDB (my-libris)');
});

// Middleware:
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
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(port, function() {
  console.log('Server running on port:', port);
});
