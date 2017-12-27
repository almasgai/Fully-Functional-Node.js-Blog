var express = require('express');
var router = express.Router();
// Passport not defined in this files so it needs to be required
var passport = require('passport');
// User not defined in this files so it needs to be required
var User = require('../models/user');

// root route
router.get("/", function(req, res) {
  res.render("landing")
})

//############################
//      AUTH ROUTES
//############################

//register form route
router.get("/register", function(req, res){
  res.render("register")
})
// sign up logic route
router.post("/register", function(req, res){

  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){

    if (err) {
      req.flash("Create an account or log in")
      return res.render("register")
    }

    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds")
    })
  })
})

// Show login form
router.get("/login", function(req, res){
  res.render("login", {message: req.flash("Error")})
})

// Login logic
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),
  function(req, res){
    // This fine how it is?
})

router.get("/logout", function(req, res){
  // comes from packages that I installed
  req.logout()
  res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
    }
    // Before redirecting to login, tell the user what is happening
  req.flash("error", "Please log in first")

  res.redirect("/login")
}


module.exports = router;
