var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  text: String,
  // Changing author from String to Object

  // String data stored inside a comment, something you can only do
  // with a nonrelational DB like mongo. Relation would go into the DB and look
  // for the data, which can be slow and resource intensive
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      username: "User"
  },
      username: String
  }
})

module.exports = mongoose.model("Comment", commentSchema)
