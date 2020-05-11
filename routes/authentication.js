const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const authenticationRouter = new express.Router();


authenticationRouter.get('/sign-up', (req, res) => {
  res.render('sign-up');
});


authenticationRouter.post('/sign-up', (req, res, next) => {
  //console.log(req.body);
  const userName = req.body.username;
  const password = req.body.password;
  //console.log(password.length);
/*   if (password.length <= 6) {
    return Promise.reject(new Error('PASSWORD_MIN_LENGTH_6_CHARACTERS'));
  } */
  bcrypt.hash(password, 10)
  .then(hashAndSalt => {
    if (password.length >= 6) {
      return User.create({
        userName,
        passwordEncypted : hashAndSalt
      });
    } else {
      return Promise.reject(new Error('PASSWORD_LENGTH_IS_MINIMUM_6_CHARACTERS'));
    }
  })
  .then(userDoc => {
    console.log(userDoc);
    res.redirect('/');
  })
  .catch(error => {
    next(error);
  });
});


authenticationRouter.get('/sign-in', (req, res) => {
  res.render('sign-in');
});


authenticationRouter.post('/sign-in', (req, res, next) => {
  //console.log(req.body);
  const userName = req.body.username;
  const password = req.body.password;
  let user;

  User.findOne({
    userName
  })
    .then(userDoc => {
      user = userDoc;
      //console.log(user);
      return bcrypt.compare(password, userDoc.passwordEncypted);
    })
    .then(comparison => {
      //console.log(req.session.userId, comparison);
      if (comparison) {
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('PASSWORD_IS_INCORRECT'));
      }
    })
    .catch(error => {
      next(error);
    });
});



module.exports = authenticationRouter;