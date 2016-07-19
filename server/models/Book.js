var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bookSchema = new Schema({
    // GB api books object, volume_id found: .accessInfo.id
    volume_id: {type: String, required: true},
    // GB api books object, smThumbnailUrl found: .volumeInfo.imageLinks.smallThumbnail
    smThumbnailUrl: {type: String, required: true},
    // GB api books object, title found: .volumeInfo.title
    // TODO set max title string length here?
    title: {type: String, required: true},
    // GB api books object, title found: .volumeInfo.authors
    authors: {type: Array, required: true},
    is_favorite: Boolean,
    rating: Number,
    _by: {type: Schema.Types.ObjectId, ref: 'User'}
  });

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
