// User model
var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),
  bookSchema = new Schema({
    // GB api books object, volume_id found: .accessInfo.id
    volume_id: {type: String, required: true},
    // GB api books object, smThumbnailUrl found: .volumeInfo.imageLinks.smallThumbnail
    smThumbnailUrl: {type: String, required: true},
    // GB api books object, title found: .volumeInfo.title
    title: {type: String, required: true},
    // GB api books object, title found: .volumeInfo.authors
    authors: {type: Array, required: true},
    is_favorite: Boolean,
    rating: Number
  }),

  userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    haveRead: [bookSchema],
    // TODO favorites will be populated from haveRead:
    favorites: [],
    // TODO want items cannot be rated
    want: [bookSchema]
  });

// extend functionality of Schema using third party pkg:
// Documentation: https://github.com/saintedlama/passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

var Book = mongoose.model('Book', bookSchema);
module.exports = {
  User: User,
  Book: Book
}
