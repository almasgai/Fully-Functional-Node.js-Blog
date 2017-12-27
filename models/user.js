var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
})
// takes the wheel and adds methods for the user
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);
