var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

router.get("/", function(req, res) {

  // get all sites from DB
  // curly brackets are empty because the goal is to search through the entire DB
  // allCampgrounds is the param for all the sites located in a DB which will be sent to the campgrounds.ejs file
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
    }
  })
})

router.post("/", middleware.isLoggedIn ,function(req, res) {
  // saving req body parts as vars
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var author= {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, author: author}

  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    }else{
      res.redirect("/campgrounds")
    }
  })
})

router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new")
})
// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {

  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
})

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  // is user logged in?
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
          res.render("campgrounds/edit", {campground: foundCampground})
        })}
      })

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds")
    }else{
      res.redirect("/campgrounds/" + req.params.id)
    }
  })

  // redirect somewhere
})

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/campgrounds")
    }else{
      res.redirect("/campgrounds")
    }
  })
})


// COMMENT DESTROY ROUTE
router.delete("/:comment_id", function(req, res){
  // findByIdAndRemove,
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back")
    }else{
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

router.get("/:comment_id/edit", function(req, res){
  res.send("EDIT A COMMENT")
})
/*
foundCampground.author.id is an object
req.user._id is a string

They look the same but the first one is a mongoose obj but when we print it we get a string which is not what it actually is. Therefore we use the method .equals to compare the two
*/


module.exports = router;
