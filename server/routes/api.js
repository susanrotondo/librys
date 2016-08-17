var
  express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  User = require('../models/User.js').User
  Book = require('../models/User.js').Book

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

//////////////////////////
// USER BOOKS COLLECTIONS
//////////////////////////

// removing the book as patch req because not deleting Book;
// removing book from User collection
// needs to also check favorites and if favorite, remove also
router.patch('/books/:id', function(req, res) {
  if(req.query.delete) {
    User.findById(req.user, function(err, user){
      for (book in user.haveRead){
        if(user.haveRead[book]._id == req.params.id) {
          user.haveRead.splice(book, 1);
          for(var i = 0; i < user.favorites.length; i++) {
            if(user.favorites[i].id == req.params.id) {
              user.favorites.splice(i, 1);
            }
          }
        }
      }
      user.save(function(err, user) {
         if(err) return console.log(err);
         res.json(user);
      })
    })
  }
  if(req.query.rating) {
    User.findById(req.user, function(err, user){
      for (book in user.haveRead){
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
  if(req.query.favorite) {
    User.findById(req.user, function(err, user){
      for (book in user.haveRead){
        // console.log('req.params.id:', req.params.id)
        if(user.haveRead[book]._id == req.params.id) {
          bookId = req.params.id;
          // console.log('user.haveRead[book].isFavorite before:', user.haveRead[book].isFavorite);
          user.haveRead[book].isFavorite = !user.haveRead[book].isFavorite;
          // console.log('user.haveRead[book].isFavorite after:', user.haveRead[book].isFavorite);
          if(user.haveRead[book].isFavorite) {
            user.favorites.unshift({
              id: bookId
            })
            console.log('just added to favorites:', user.favorites)
            break;
          } else {
            for(var i = 0; i < user.favorites.length; i++) {
              if(user.favorites[i].id == bookId) {
                user.favorites.splice(book, 1);
            }
          }
          console.log('just removed from favorites:', user.favorites);
          break;
          }
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
    console.log('user', user)
    if(err) return console.log(err);
    res.json(user.haveRead);
  })
})

router.get('/books/favorites', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) return console.log(err);
    console.log('in api.js, user.favorites is:', user.favorites)
    res.json(user.favorites);
  })
})

router.post('/books/add-book', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) return console.log(err);
      // to add new book to beginning of array
      user.haveRead.unshift({
        volume_id: req.body.book.id,
        smThumbnailUrl: req.body.book.volumeInfo.imageLinks.smallThumbnail,
        title: req.body.book.volumeInfo.title,
        authors: req.body.book.volumeInfo.authors,
        isFavorite: false,
        rating: 0
      });
      user.save(function(err, user) {
         if(err) return console.log(err);
         res.json(user);
      })
  })
});



module.exports = router;
