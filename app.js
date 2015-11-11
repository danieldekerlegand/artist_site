var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');
var flash = require('connect-flash');

// Configure the local strategy for use by Passport.

passport.use(new LocalStrategy(function(username, password, done) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, 'Incorrect username.'); }
      if (user.password != password) { return done(null, false, 'Incorrect password.'); }
      return done(null, user);
    });
  }));
  
// Configure Passport authenticated session persistence.

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.users.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});


var app = express();

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 1337))
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser());

// Use application-level middleware for common passport functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());                // use flash messages
app.use(passport.initialize());  // initialize passport
app.use(passport.session());     // restore authentication state

// define routes
app.use(require('./routes'));    

// start the server
app.listen(app.get('port'), function (){
	console.log('Webserver ready on port ' + app.get('port'));
});