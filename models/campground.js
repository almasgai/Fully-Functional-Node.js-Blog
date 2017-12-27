var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      // the comments propert should be an array of comment ids
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})

//var Campground = mongoose.model("Campground", campgroundSchema)

module.exports = mongoose.model("Campground", campgroundSchema)
