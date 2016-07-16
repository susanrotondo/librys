var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bookSchema = new Schema({
    // use volume id to GET book from Google Books api
    volume_id: {type: String, required: true},
    is_favorite: Boolean,
    rating: Number
  });

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
