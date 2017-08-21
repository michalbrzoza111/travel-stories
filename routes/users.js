const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to register user'
      });
    } else {
      res.json({
        success: true,
        msg: 'User registered'
      });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (!password && password === null && password === undefined) {
        return res.json({
          success: false,
          msg: 'Please insert password'
        });
      }

      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    });
  });
});

// Post 'User Post'
router.post('/:username', (req, res, next) => {
  const username = req.body.authorUsername;
  const post = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }
    let loggedUser = new User(user);

    User.addPost(loggedUser, post, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to add post'
        });
      } else {
        res.json({
          success: true,
          msg: 'Post added'
        });
      }
    });
  });
});

// Post 'Post' Comment
router.post('/wall/comments', (req, res, next) => {
  const username = req.body.postAuthorUsername;
  const postId = req.body.postId;
  const comment = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }
    let commentedUser = new User(user);

    User.addComment(postId, comment, commentedUser, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to add post'
        });
      } else {
        res.json({
          success: true,
          msg: 'Post added'
        });
      }
    });
  });
});

//Post 'Post' Comment
//TODO better, dry solution

router.post('/post/:username/:postId/comments', (req, res, next) => {
  const username = req.body.postAuthorUsername;
  const postId = req.body.postId;
  const comment = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }
    let commentedUser = new User(user);

    User.addComment(postId, comment, commentedUser, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to add post'
        });
      } else {
        res.json({
          success: true,
          msg: 'Post added'
        });
      }
    });
  });
});


//Post 'Post' like
router.post('/wall/likes', (req, res, next) => {
  const username = req.body.postAuthorUsername;
  const postId = req.body.postId;
  const like = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }
    let likedUser = new User(user);

    User.addLike(postId, like, likedUser, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to add post'
        });
      } else {
        res.json({
          success: true,
          msg: 'Post added'
        });
      }
    });
  });
});

//Post 'Post' like
//TODO better, dry solution

router.post('/post/:username/:postId/likes', (req, res, next) => {
  const username = req.body.postAuthorUsername;
  const postId = req.body.postId;
  const like = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }
    let likedUser = new User(user);

    User.addLike(postId, like, likedUser, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to add post'
        });
      } else {
        res.json({
          success: true,
          msg: 'Post added'
        });
      }
    });
  });
});

// Get All Users
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  User.find({}, function(err, users) {
    res.json({
      users: users
    });
  });
});

//Get Single User
router.get('/:username', (req, res, next) => {
  if (req.params.username) {
    let username = req.params.username;
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({
          success: false,
          msg: 'User not found'
        });
      }
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to request user'
        });
      } else {
        // res.json({success: true, msg:'Successfully requested user'});
        res.json(user)
      }
    });
  }
});


module.exports = router;
