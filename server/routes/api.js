var
  express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  User = require('../models/User.js')
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

router.patch('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    console.log(user)
    if(req.body.rating) user.haveRead.rating = req.body.rating;
  })
  res.json(req.body)

})

////////////////////////////////////////////////
//         USER COLLECTIONS ROUTES
////////////////////////////////////////////////

router.get('/books', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) return console.log(err);
    // console.log('user.haveRead:', user.haveRead);
    res.json(user.haveRead);
  })
})



router.delete('/books/:id', function(req, res) {
  console.log('req.user._id', req.user._id);
  console.log('req.params.id', req.params.id);
  User.findById(req.user._id, function(err, user) {
    if(err) return console.log(err);
    // user.haveRead.splice(user.haveRead.indexOf(), 1);
    // console.log(user);

    user.save(function(err, user) {
       if(err) return console.log(err);
       res.json(user);
    })
  })
})

router.post('/add-book', function(req, res) {
  // console.log('req.user.haveRead:', req.user.haveRead)
  // there is req.user since submission form is only visible to logged in user; attach new book to current user
  User.findById(req.user._id, function(err, user) {
    if(err) return console.log(err);
      user.haveRead.push({
        volume_id: req.body.book.id,
        smThumbnailUrl: req.body.book.volumeInfo.imageLinks.smallThumbnail,
        title: req.body.book.volumeInfo.title,
        authors: req.body.book.volumeInfo.authors,
        is_favorite: false
      });
      // console.log(user);
      user.save(function(err, user) {
         if(err) return console.log(err);
         res.json(user);
      })
  })
});



module.exports = router;
