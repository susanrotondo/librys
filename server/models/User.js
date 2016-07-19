// User model
var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),

  userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    haveRead: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    // TODO favorites will be populated from haveRead:
    favorites: [],
    // TODO want items cannot be rated
    want: [{type: Schema.Types.ObjectId, ref: 'Book'}]
  });

// extend functionality of Schema using third party pkg:
// Documentation: https://github.com/saintedlama/passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;
