var express = require('express');
// Param not finding id param. Not making it through to comment route so I ({merge param true}) from campground and comments together so that
//the id could be found in comment routes
var router = express.Router({mergeParams: true});
// Running into problems because I moved files around so I have to specify where
// Campground is
var Campground = require('../models/campground');
// Same with Comment
var Comment = require('../models/comment');
var middleware = require('../middleware');


//=============================
//Comments Routes
//=============================


// Comments new
router.get("/new", middleware.isLoggedIn ,function(req, res){
  //find by ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else {
      res.render("comments/new", {campground: campground, userName : req.user.username})
    }
  })
})

// Comment create
router.post("/", middleware.isLoggedIn, function(req, res){
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      req.flash("Campground not found")
      res.redirect("/campgrounds")
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          req.flash("Log in to comment");
        }else {
          // add username and id to comment
          comment.author.id = req.user._id
          comment.author.username = req.user.username

          console.log("\n\n\n" + req.user.username + "\n\n\n");
          // save comment
          comment.save()
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          req.flash("success", "Successfully added comment")
          res.redirect("/campgrounds/" + campground._id)
        }
      });
    }
  });
  /*
  create new comment
  connect new comment to campground
  redirect campground show page
  */
});
      //##################################
      //Since data association is used in
      //name section, I do not have to do
      //var text = req.body.text
      //var author = ...
      //Instead this works:
      //req.body.comment
      //##################################

      // connect new comment to campground
      // redirect campground to show page

// COMMENTS EDIT COMMENT
router.get("/:comment_id/edit", function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if (err) {
      res.redirect("back")
    }else {
      res.render("comments/edit", {campground_id: req.params.id})
    }
  })
})

// COMMENT UPDATE
router.put("/:comment_id", function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if (err) {
      res.redirect("back")
    }else{
      res.redirect("/campground/" + req.params.id)
    }
  })
})



module.exports = router;
