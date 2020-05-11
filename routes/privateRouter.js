const express = require('express');
const privateRoute = require('../midleware/private-route');
const User = require('../models/user');


const privateRouter = new express.Router();


privateRouter.get('/main', privateRoute, (req, res) => {
  res.render('main');
});

privateRouter.get('/private', privateRoute, (req, res) => {
  res.render('private');
});

privateRouter.get('/profile', privateRoute, (req, res) => {
  res.render('profile');
  //console.log('profilepage req', req.user);
});

privateRouter.get('/profile/edit', privateRoute, (req, res) => {
  res.render('profile-edit');
  //console.log('profilepage req', req.user);
});

privateRouter.post('/profile/edit', privateRoute, (req, res, next) => {
  
  const userId = req.user._id;
  const name = req.body.name;
  console.log(name, userId);
  User.findByIdAndUpdate({_id : userId}, {name : name})
    .then(userDoc => {
      console.log(userDoc);

      res.render('profile');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = privateRouter;