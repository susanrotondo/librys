// User model
// var
//   mongoose = require('mongoose'),
//   bookSchema = require('bookSchema'),

  // Schema = mongoose.Schema,
  //
  // bookSchema = new Schema({
  //   // GB api books object, volume_id found: .accessInfo.id
  //   volume_id: {type: String, required: true},
  //   // GB api books object, smThumbnailUrl found: .volumeInfo.imageLinks.smallThumbnail
  //   smThumbnailUrl: {type: String, required: true},
  //   // GB api books object, title found: .volumeInfo.title
  //   title: {type: String, required: true},
  //   // GB api books object, title found: .volumeInfo.authors
  //   authors: {type: Array, required: true},
  //   is_favorite: Boolean,
  //   rating: Number
  // });

// var Book = mongoose.model('Book', bookSchema);
// module.exports = Book;

// var
//   mongoose = require('mongoose'),
//   Schema = mongoose.Schema,
//   bookSchema = new Schema({
//     // GB api books object, volume_id found: .accessInfo.id
//     volume_id: {type: String, required: true},
//     // GB api books object, smThumbnailUrl found: .volumeInfo.imageLinks.smallThumbnail
//     smThumbnailUrl: {type: String, required: true},
//     // GB api books object, title found: .volumeInfo.title
//     title: {type: String, required: true},
//     // GB api books object, title found: .volumeInfo.authors
//     authors: {type: Array, required: true},
//     is_favorite: Boolean,
//     rating: Number,
//     _by: {type: Schema.Types.ObjectId, ref: 'User'}
//   });
//
// var Book = mongoose.model('Book', bookSchema);
// module.exports = Book;

// NOTE this code came from routes/api.js -- when Book was a separate model:
// router.post('/books', function(req, res) {
//   console.log('req.user.haveRead:', req.user.haveRead)
//   // assume there is req.user since submission form is only visible to logged in user; attach new book to current user
//   User.findById(req.user._id, function(err, user) {
//     if(err) return console.log(err);
//     var newBook = new Book({
//       volume_id: req.body.book.id,
//       smThumbnailUrl: req.body.book.volumeInfo.imageLinks.smallThumbnail,
//       title: req.body.book.volumeInfo.title,
//       authors: req.body.book.volumeInfo.authors,
//       is_favorite: false
//     });
//     newBook._by = user;
//     newBook.save(function(err, book) {
//       if(err) return console.log(err);
//       user.haveRead.push(book);
//       // console.log(user);
//       user.save(function(err, user) {
//          if(err) return console.log(err);
//          res.json(user);
//       })
//     })
//   })
// });

// User.findById(user._id).populate('haveRead', 'volume_id smThumbnailUrl title authors is_favorite rating -_id').exec(function(err, user) {
//   if(err) return console.log(err);
// })
