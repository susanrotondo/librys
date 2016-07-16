// User model
var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),

  userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    collections: [
      haveRead: [{type: Schema.Types.ObjectId, ref: 'Book'}],
      // TODO favorites will be populated from haveRead:
      // favorites: [],
      // TODO wants cannot be rated
      want: [{type: Schema.Types.ObjectId, ref: 'Book'}]
    ]
  });

// extend functionality of Schema using third party pkg:
User.plugin(passportLocalMongoose)

var User = mongoose.model('User', userSchema);
module.exports = User;
