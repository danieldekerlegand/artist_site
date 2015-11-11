var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', function (req, res){
  res.render('index',{ user: req.user });
});

router.get('/login', function(req, res){
  res.render('login', { message: req.flash('error') });
});

router.post('/login', 
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
});

router.get('/aboutme', function (req, res){
  res.render('aboutme', { user: req.user });
});

router.get('/artgallery', function (req, res){
    res.render('artgallery', { user: req.user });
});

router.get('/blog', function (req, res) {
	  res.render('blog', { user: req.user });
});

router.get('/commissions', function (req, res) {
	  res.render('commissions', { user: req.user });
});

router.get('/contact', function (req, res) {
	  res.render('contact', { user: req.user });
});

router.get('/forsale', function (req, res) {
	  res.render('forsale', { user: req.user });
});



module.exports = router;