// All Middleware goes here
var Campground = require("../models/campground")
var Comment = require("../models/comment")

var middlewareObj = {};

// Middleware always has three params: req, res, next
middlewareObj.checkCampgroundOwnership =
function(req, res, next){
if(req.isAuthenticated()){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      res.redirect("back")
    }else{
      if(foundCampground.author.id.equals(req.user._id)){
        next()
      }else{
        //document.getElementById("messageHere").textContent = "Y'all need to log in"
        req.flash("error", "You don't have permission to do that")
        res.redirect("back")
      }
    }
  })
}}

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        req.flash("error", "Post not found")
        res.redirect("back")
      }else{
        // does user own campground
        if(foundComment.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You need to login")
          res.redirect("back")
      }
    }
  })
}
}


// Middleware
middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
    }
  res.redirect("/login")
}

module.exports = middlewareObj;
