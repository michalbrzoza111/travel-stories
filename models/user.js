const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true  },
  username: { type: String,  required: true },
  password: { type: String,  required: true },
  avatar: { type: String, required: true, default: "https://www.blackmores.com.au/~/media/bklau/author/profiledefault.png?db=web" },
  followers: [
    {
      authorUsername: { type: String,  required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  posts: [
    {
      date: { type: Date, default: Date.now },
      authorUsername: { type: String,  required: true },
      authorAvatar: { type: String,  required: false },
      tags: { type: Array, required: false, default: [] },
      imgUrl: { type: String,  required: true },
      smallImgUrl: { type: String,  required: false },
      likes: [
        {
          postAuthorUsername: { type: String, required: true },
          authorUsername: { type: String,  required: true },
          postId : { type: String, required: true },
        }
      ],
      comments: [
        {
          postAuthorUsername: { type: String, required: true },
          authorUsername: { type: String,  required: true },
          postId : { type: String, required: true },
          content: { type: String,  required: true },
          date: { type: Date, default: Date.now },
        }
      ]
    }
  ]
});

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', function(next) {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {
    username: username
  }
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}


// POST (ARTICLE) METHODS
module.exports.getUserPostById = function(id, callback) {
  User.posts.findById(id, callback);
}

module.exports.addPost = function(loggedUser, post, callback) {
  loggedUser.posts.push(post);
  loggedUser.save(callback);
}

module.exports.addLike = function(postId, like, likedUser, callback) {
  let post = likedUser.posts.id(postId)
  post.likes.push(like)
  likedUser.save(callback);
}

module.exports.addComment = function(postId, comment, commentedUser, callback) {
  let post = commentedUser.posts.id(postId)
  post.comments.push(comment)
  commentedUser.save(callback);
};

// --------


module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getAllUsers = function(callback) {
  User.find(callback);
}
