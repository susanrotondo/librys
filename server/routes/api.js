var
  express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  User = require('../models/User.js').User
  Book = require('../models/User.js').Book
  // Book = require('../models/Book.js')

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      })
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({ status: 'Registration successful!' })
    })
  })
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({
        err: info
      })
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        })
      }
      res.status(200).json({
        status: 'Login successful!',
        user: user
      })
    })
  })(req, res, next)
});

router.get('/logout', function(req, res) {
  req.logout()
  res.status(200).json({
    status: 'Goodbye!'
  })
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    console.log('router.get status res status is false');
    return res.status(200).json({
      status: false
    })
  }
  console.log('router.get status is true')
  res.status(200).json({
    status: true,
    user: req.user
  })
});

///////////////////////
// USER COLLECTIONS
///////////////////////

// TODO https://docs.mongodb.com/manual/reference/operator/update/pull/
// '/user/:book_id'
router.patch('/:id', function(req, res) {
  console.log(req.query)
  console.log(req.user._id)
  if(req.query.delete) {
    User.findById(req.user, function(err, user){
      // console.log(user._id)
      // console.log(user.haveRead[0])
      for (book in user.haveRead){
        // console.log("each book" + user.haveRead[book]._id);
        // console.log("params book" + req.params.id);
        if(user.haveRead[book]._id ==  req.params.id) {
          user.haveRead.splice(book, 1);
        }
      }
      user.save(function(err, user) {
         if(err) return console.log(err);
         res.json(user);
      })
    })
  }
  if(req.query.rating) {
    // console.log(req.query.rating)
    // console.log('req.user:', req.user);
    User.findById(req.user, function(err, user){
      for (book in user.haveRead){
        // console.log("each book" + user.haveRead[book]._id);
        // console.log("params book" + req.params.id);
        if(user.haveRead[book]._id ==  req.params.id) {
          user.haveRead[book].rating = Number(req.query.rating);
        }
      }
      user.save(function(err, user) {
         if(err) return console.log(err);
         res.json(user);
      })
    })
  }
})


router.get('/books', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) return console.log(err);
    // console.log('user.haveRead:', user.haveRead);
    res.json(user.haveRead);
  })
})

router.post('/add-book', function(req, res) {
  // console.log('req.user.haveRead:', req.user.haveRead)
  // there is req.user since submission form is only visible to logged in user; attach new book to current user
  User.findById(req.user._id, function(err, user) {
    if(err) return console.log(err);
      user.haveRead.unshift({
      // user.haveRead.push({
        volume_id: req.body.book.id,
        smThumbnailUrl: req.body.book.volumeInfo.imageLinks.smallThumbnail,
        title: req.body.book.volumeInfo.title,
        authors: req.body.book.volumeInfo.authors,
        is_favorite: false,
        rating: 0
      });
      // console.log(user);
      user.save(function(err, user) {
         if(err) return console.log(err);
         res.json(user);
      })
  })
});



module.exports = router;
