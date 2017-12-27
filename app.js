var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  Campground = require('./models/campground'),
  methodOverride = require('method-override');
  Comment = require("./models/comment"),
  User = require('./models/user'),
  seedDB = require('./seeds');

// Requiring routes
var commentRoutes = require('./routes/comment'),
    campgroundRoutes = require('./routes/campground'),
    indexRoutes = require('./routes/index');

// connecting mongo to db
// db is now called yelp_camp
mongoose.connect("mongodb://localhost/yelp_camp_v6")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())

// app.use(express.static("public"))
// seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: "This is a secret",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


// Given from user.js
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use(function(req, res, next){
  res.locals.currentUser = req.username
  res.locals.message = req.flash("error")
  next()
})


// appending "/campgrounds to routes" to save time
// same thing as /campgrounds/ + *specified route*
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/", indexRoutes)


app.listen(3000, function() {
  console.log("YelpCamp Server is now running...");
})
